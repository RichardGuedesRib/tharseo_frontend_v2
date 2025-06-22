# 🛡️ Estratégia de Segurança - Tharseo Frontend

## Configuração de CSP Dual (Desenvolvimento vs Produção)

### 🔧 **Desenvolvimento Local (`npm run dev`)**

**Arquivo**: `vite.config.ts`
```
CSP mais permissivo com:
- 'unsafe-inline' para scripts e estilos
- 'unsafe-eval' para sourcemaps e debugging
- WebSocket localhost:5173 para HMR
```

**Por que necessário?**
- Vite injeta scripts inline para Hot Module Replacement (HMR)
- DevTools e debugging requerem eval() para sourcemaps
- Desenvolvimento precisa de flexibilidade para produtividade

### 🚀 **Produção (Firebase Hosting)**

**Arquivo**: `firebase.json`
```
CSP restritivo sem:
- ❌ 'unsafe-inline' - previne XSS
- ❌ 'unsafe-eval' - previne execução arbitrária
- ✅ Apenas domínios específicos autorizados
```

**Segurança máxima em produção:**
- Todos os scripts são externos e verificáveis
- Estilos apenas de fontes confiáveis
- Bloqueio de arquivos sensíveis (._darcs, BitKeeper)
- Headers de segurança completos

## 📋 **Checklist de Segurança**

### Correções Implementadas (ZAP Scan):
- ✅ CSP form-action definido
- ✅ img-src restringido (removido wildcard)
- ✅ Arquivos sensíveis bloqueados
- ✅ Headers Sec-Fetch-* configurados
- ✅ SRI para recursos estáticos (Font Awesome)

### Estratégia de Deploy:
1. **Desenvolvimento**: CSP permissivo para DX
2. **Build**: Gera arquivos estáticos sem inline
3. **Produção**: CSP restritivo aplicado pelo Firebase
4. **Resultado**: Zero vulnerabilidades em produção

## 🚀 **Compatibilidade com CI/CD e ArgoCD**

### Frontend (Firebase Hosting):
✅ **GitHub Actions** → `firebase-hosting-merge.yml`
- Build: `npm ci && npm run build`
- Deploy: Firebase Hosting automático
- CSP: Aplicado via `firebase.json` (produção)
- ZAP Scan: Executado após deploy para verificar segurança

### Backend (Kubernetes + ArgoCD):
✅ **Arquitetura de Deploy**:
- GitHub Actions → Docker Build → GHCR Registry
- ArgoCD → Deploy automático no Kubernetes
- Service: ClusterIP (interno)
- **Sem Ingress/Load Balancer** configurado

### 🔍 **Análise de Impacto CSP**:

**❌ Backend não é afetado** pelas mudanças CSP do frontend:
- Backend roda em containers separados (K8s)
- API endpoints não servem HTML com CSP
- Comunicação via API REST/JSON
- Headers de segurança são responsabilidade do backend

**✅ Frontend CSP é isolado**:
- Aplicado apenas no Firebase Hosting
- Não interfere com comunicação backend
- ArgoCD/K8s não processam frontend

## ⚠️ **IMPORTANTE**

**NUNCA** usar a configuração de desenvolvimento em produção:
- Usar apenas `npm run build` para deploy
- Firebase automaticamente aplica CSP seguro
- Vite config é ignorado em produção
- ArgoCD gerencia apenas backend (NestJS)

## 🎯 **Resultado Final**

- **Desenvolvimento**: Funcional com todas as ferramentas
- **Frontend Produção**: Firebase + CSP seguro + ZAP validado
- **Backend Produção**: Kubernetes + ArgoCD (não afetado)
- **Zero** vulnerabilidades CSP em produção
- **CI/CD**: Totalmente compatível com pipelines existentes