import axiosInstance from "@/services/axiosConfig";

interface ProfileData {
  username: string;
  phone: string;
}

interface ChangePasswordData {
  old_password: string;
  new_password: string;
}

const UserService = {
  updateProfile: async (id: string | undefined, profileData: ProfileData) => {
    const response = await axiosInstance.put(`/profiles/${id}`, profileData);
    return response.data;
  },

  changePassword: async (
    id: string | undefined,
    passwordData: ChangePasswordData
  ) => {
    await axiosInstance.put(`/profiles/${id}/password`, passwordData);
  },

  getProfile: async (id: string | undefined) => {
    const response = await axiosInstance.get(`/profiles/${id}`);
    return response.data;
  },
};

export default UserService;
