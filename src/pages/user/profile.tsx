import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditProfileForm } from "@/components/edit-profile-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { useAuthStore } from "@/store/useAuthStore";
import { Pencil, User, Mail, Phone, UserCheck, Lock } from "lucide-react";

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (!user) {
    return (
      <div className="bg-bg-principal w-full flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-gray-500">Usuário não encontrado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEditSuccess = (updatedUser: { name: string; lastName: string; email: string; phone: string }) => {
    updateUser({
      ...user,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
    setIsEditing(false);
  };

  const handlePasswordChangeSuccess = () => {
    setIsChangingPassword(false);
  };

  return (
    <div className="bg-bg-principal w-full flex justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Meu Perfil
            </CardTitle>
            {!isEditing && !isChangingPassword && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            )}
          </CardHeader>
          
          <CardContent>
            {isEditing ? (
              <EditProfileForm
                user={{
                  name: user.name,
                  lastName: user.lastName,
                  email: user.email,
                  phone: user.phone,
                }}
                onSuccess={handleEditSuccess}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Nome completo</p>
                    <p className="text-base">{user.name} {user.lastName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-base">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Telefone</p>
                    <p className="text-base">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <UserCheck className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Nível do usuário</p>
                    <p className="text-base capitalize">{user.levelUser}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Alterar Senha
            </CardTitle>
            {!isChangingPassword && !isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangingPassword(true)}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Alterar Senha
              </Button>
            )}
          </CardHeader>
          
          <CardContent>
            {isChangingPassword ? (
              <ChangePasswordForm
                onSuccess={handlePasswordChangeSuccess}
                onCancel={() => setIsChangingPassword(false)}
              />
            ) : (
              <div className="text-gray-500 text-sm">
                Clique no botão "Alterar Senha" para modificar sua senha de acesso.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
