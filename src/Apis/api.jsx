import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Base URL for the API
export const BASE_URL = "http://localhost:8000/api";
export const IMG_URL = "http://localhost:8000";

// export const BASE_URL = "https://app.simora.ai/api";
// export const IMG_URL = "https://app.simora.ai";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Utility Functions
// export const getToken = () => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token)
//       if (decodedToken.exp < Date.now() / 1000) {
//         // Token has expired, remove it from local storage and redirect to login page
//         localStorage.removeItem('token')
//         history.push('/login')
//         throw new Error('Token has expired')
//       }
//       return token
//       // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       // Token is malformed or invalid, remove it from local storage and redirect to login page

//       localStorage.removeItem('token')
//       history.push('/login')
//       throw new Error('Invalid token')
//     }
//   }
//   return null
// }

export const getToken = () => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("creator_token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        // Token has expired, remove it from local storage and return null
        localStorage.removeItem("token");
        return null;
      }
      return token;
    } catch (error) {
      // Token is malformed or invalid, remove it from local storage and return null
      localStorage.removeItem("token");
      return null;
    }
  }
  return null;
};

// Usage
export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = getToken();
  if (!token) {
    // Token is invalid or expired, redirect to login page
    navigate("/login");
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logoutAPI = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Generalized API Request Function
const apiRequest = async (endpoint, data = null, method = "post") => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await api.request({
    url: endpoint,
    method,
    data,
    headers,
  });
  return response.data;
};

// Authentication APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest("/adminuser/login", payload);
  if (data?.token) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const registerAPI = async (payload) => {
  const data = await apiRequest("/auth/register", payload);
  return data;
};

export const updateUserDetailsAPI = async (userId, payload) => {
  const data = await apiRequest(
    `/users/profile/update/${userId}`,
    payload,
    "post"
  );
  return data;
};

export const resetPasswordAPI = async (payload) => {
  const data = await apiRequest("/auth/reset-password", payload);
  return data;
};

export const getCustomerDetailsAPI = async (userId) => {
  const data = await apiRequest(
    `/adminuser/user-dashboard/${userId}`,
    null,
    "get"
  );
  return data;
};

// Credits APIs

export const addcreditsAPI = async (payload) => {
  const data = await apiRequest("/credits/admin/add-credits", payload);
  return data;
};

export const deductCreditsAPI = async (payload) => {
  const data = await apiRequest("/credits/admin/deduct-credits", payload);
  return data;
};

// subscription routes

export const getAllSubscribedUsersAPI = async (
  page = 1,
  size = 10,
  search = ""
) => {
  const data = await apiRequest(
    `/subscription/getAllSubscriptions?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};

export const getSubscriptionByIdAPI = async (id) => {
  const data = await apiRequest(`/subscription/${id}`, null, "get");
  return data;
};

export const getAllUsersAPI = async ({ page = 1, size = 10, search = "" }) => {
  const data = await apiRequest(
    `/users/getAll?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};

// Recharge APIs

export const createRechargePlanAPI = async (payload) => {
  const data = await apiRequest("/recharge-plans/create-plan", payload, "post");
  return data;
};

export const updateRechargePlanAPI = async (id, payload) => {
  const data = await apiRequest(
    `/recharge-plans/update-plan/${id}`,
    payload,
    "post"
  );
  return data;
};

export const deleteRechargePlanAPI = async (id) => {
  const data = await apiRequest(
    `/recharge-plans/delete-plan/${id}`,
    null,
    "post"
  );
  return data;
};

export const toggleRechargePlanStatusAPI = async (id) => {
  const data = await apiRequest(
    `/recharge-plans/toggle-status/${id}`,
    null,
    "post"
  );
  return data;
};

export const getAllPlansForAdminAPI = async () => {
  const data = await apiRequest(
    "/recharge-plans/getAllPlansForAdmin",
    null,
    "get"
  );
  return data;
};

export const getRechargedUsersAPI = async (
  page = 1,
  size = 10,
  search = ""
) => {
  const data = await apiRequest(
    `/recharge-plans/getAllRechargedUsers?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};

// subscription routes
export const createPlanAPI = async (planData) => {
  const data = await apiRequest(
    "/subscription-plans/create-plan",
    planData,
    "post"
  );
  return data;
};

export const updatePlanAPI = async (id, planData) => {
  const data = await apiRequest(
    `/subscription-plans/update-plan/${id}`,
    planData,
    "post"
  );
  return data;
};

export const deletePlanAPI = async (id) => {
  const data = await apiRequest(
    `/subscription-plans/delete-plan/${id}`,
    null,
    "post"
  );
  return data;
};

export const togglePlanStatusAPI = async (id) => {
  const data = await apiRequest(
    `/subscription-plans/toggle-status/${id}`,
    null,
    "post"
  );
  return data;
};

export const getAllPlansForAdmin = async () => {
  const data = await apiRequest(
    "/subscription-plans/getAllPlansForAdmin",
    null,
    "get"
  );
  return data;
};

// Dashboard APIs

export const getAllDashboardData = async () => {
  return await apiRequest("/dashboard/getAllDashboardData", null, "get");
};
export const getDashboardStats = async () => {
  return await apiRequest("/dashboard/stats", null, "get");
};
export const getRecentVideos = async () => {
  return await apiRequest("/dashboard/recent-videos", null, "get");
};

export const getRecentTransactions = async () => {
  return await apiRequest("/dashboard/recent-transactions", null, "get");
};

export const getDailyGeneration = async () => {
  return await apiRequest("/dashboard/daily-generation", null, "get");
};

export const getSubscriptionDistribution = async () => {
  return await apiRequest("/dashboard/subscription-distribution", null, "get");
};

export const getRevenueData = async () => {
  return await apiRequest("/dashboard/revenue-data", null, "get");
};

export const getPointsUsageData = async () => {
  return await apiRequest("/dashboard/points-usage", null, "get");
};

// Video streaming API
export const getSecureVideoUrl = async (videoId) => {
  return await apiRequest(`/videos/secure-url/${videoId}`, null, "get");
};
export const getAllVideosByUserId = async ({ userId, page = 1, size = 10 }) => {
  return await apiRequest(
    `/video-generation/admin/video/${userId}?page=${page}&size=${size}`,
    null,
    "get"
  );
};

// Add this function to your existing api.jsx file

export const getLatestVideosAPI = async ({
  page = 1,
  size = 10,
  startDate = "",
  endDate = "",
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: size.toString(),
  });

  if (startDate) {
    params.append("startDate", startDate);
  }

  if (endDate) {
    params.append("endDate", endDate);
  }

  const data = await apiRequest(
    `/video-generation/admin/get-latest-videos?${params.toString()}`,
    null,
    "get"
  );
  return data;
};

// Audio streaming API
export const getSecureAudioUrl = async (audioId) => {
  return await apiRequest(`/audios/secure-url/${audioId}`, null, "get");
};

export const getAllAudiosByUserId = async ({ userId, page = 1, size = 10 }) => {
  return await apiRequest(
    `/text-to-speech/admin/conversions/${userId}?page=${page}&size=${size}`,
    null,
    "get"
  );
};

// Actor Selector APIs
export const getAllActorSelectorsForAdminAPI = async ({
  page = 1,
  size = 10,
  search = "",
}) => {
  const data = await apiRequest(
    `/actor-selectors/admin/all?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};
export const getAllActorSelectorsForAdminAPIForCreators = async ({
  page = 1,
  size = 1000,
  search = "",
}) => {
  const data = await apiRequest(
    `/actor-selectors/admin/all?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};
export const getActorSelectorsByIdAPI = async (id) => {
  const data = await apiRequest(
    `/actor-selectors/getactorbyid/${id}`,
    null,
    "get"
  );
  return data;
};

export const createActorSelectorAPI = async (payload) => {
  const data = await apiRequest("/actor-selectors/add-actor", payload, "post");
  return data;
};

export const addVideoToActorAPI = async (payload) => {
  const data = await apiRequest(
    "/actor-selectors/upload-video",
    payload,
    "post"
  );
  return data;
};

export const updateActorSelectorAPI = async (id, payload) => {
  const data = await apiRequest(
    `/actor-selectors/update-actor/${id}`,
    payload,
    "post"
  );
  return data;
};

export const deleteActorSelectorAPI = async (id) => {
  const data = await apiRequest(
    `/actor-selectors/delete-actor/${id}`,
    null,
    "delete"
  );
  return data;
};

export const getActorslataestVideosAPI = async ({ page = 1, size = 10 }) => {
  const data = await apiRequest(
    `/actor-selectors/getActorVideo?page=${page}&size=${size}`,
    null,
    "get"
  );
  return data;
};

export const getActorsVideoByIdAPI = async (id) => {
  const data = await apiRequest(
    `/actor-selectors/getActorVideo/${id}/videos`,
    null,
    "get"
  );
  return data;
};

// Voice Settings APIs
export const getAllVoiceSettingsForAdminAPI = async ({
  page = 1,
  size = 100,
  search = "",
}) => {
  const data = await apiRequest(
    `/voice-settings/admin/all?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};

export const createVoiceSettingAPI = async (payload) => {
  const data = await apiRequest(
    "/voice-settings/create-voice-setting",
    payload,
    "post"
  );
  return data;
};

export const updateVoiceSettingAPI = async (id, payload) => {
  const data = await apiRequest(
    `/voice-settings/update-voice-setting/${id}`,
    payload,
    "put"
  );
  return data;
};

export const deleteVoiceSettingAPI = async (id) => {
  const data = await apiRequest(
    `/voice-settings/delete-voice-setting/${id}`,
    null,
    "delete"
  );
  return data;
};

// project APIs

export const getProjectByProjectIdAPI = async (projectId) => {
  const data = await apiRequest(
    `/projects/admin/getProjectById/${projectId}`,
    null,
    "get"
  );
  return data;
};

// scrip analyze APIs
export const getScriptAnalysisAPIByProjectId = async (projectId) => {
  const data = await apiRequest(
    `/script-analysis/user-analyses/${projectId}`,
    null,
    "get"
  );
  return data;
};

export const getScriptAnalysisAPIByAudioId = async (audioId) => {
  const data = await apiRequest(
    `/script-analysis/user-analyses/audio/${audioId}`,
    null,
    "get"
  );
  return data;
};

export const generateScriptAnalysisAPI = async (payload) => {
  const data = await apiRequest(
    "/script-analysis/admin/analyze",
    payload,
    "post"
  );
  return data;
};

// logs
export const getLogsAPI = async () => {
  const data = await apiRequest("/logs/get-logs", null, "get");
  return data;
};
export const getLogsByIdAPI = async (userId, page = 1, limit = 10) => {
  const data = await apiRequest(
    `/logs/logs/${userId}?page=${page}&limit=${limit}`,
    null,
    "get"
  );
  return data;
};

// get All the Customer API

export const getAllCustomersAPI = async (userId) => {
  const data = await apiRequest(
    `/custom-actors/get-All-custom-actors/${userId}`,
    null,
    "get"
  );
  return data;
};
export const getAllcustomActors = async () => {
  const data = await apiRequest(
    "/custom-actors/get-all-User-custom-actors",
    null,
    "get"
  );
  return data;
};

export const deletecustomActors = async (actorId) => {
  const data = await apiRequest(
    `/custom-actors/delete-custom-actor/${actorId}`,
    null,
    "post"
  );
  return data;
};

// User Actors Apis
export const addUserActors = async (payload) => {
  const data = await apiRequest("/user-actors/add-to-user", payload, "post");
  return data;
};

export const deleteUserActors = async (actorId) => {
  const data = await apiRequest(
    `/user-actors/delete-user-actor/${actorId}`,
    null,
    "post"
  );
  return data;
};

// Creators APIs
export const createCreatorAPI = async (payload) => {
  // Using FormData for file uploads
  const data = await apiRequest("/creators/create", payload, "post");
  return data;
};

export const updateCreatorsAdminAPI = async (id, formData) => {
  const data = await apiRequest(
    `/creators/admin/update-creator/${id}`,
    formData,
    "post"
  );
  return data;
};

export const uploadConsentVideoAPI = async (formData) => {
  const data = await apiRequest(
    `/creators/upload-consent-video`,
    formData,
    "post"
  );
  return data;
};

export const getAllCreatorsAPI = async ({
  page = 1,
  size = 10,
  search = "",
}) => {
  const data = await apiRequest(
    `/creators/admin/get-all-creators?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};

export const getCreatorByIdAPI = async (id) => {
  const data = await apiRequest(`/creators/admin/get-by-id/${id}`, null, "get");
  return data;
};

export const updateCreatorAPI = async (id, data) => {
  const datas = await apiRequest(
    `/creators/admin/${id}/approval`,
    data,
    "post"
  );
  return datas;
};

export const deleteCreatorAPI = async (id) => {
  const data = await apiRequest(
    `/creators/delete-by-creatorsId/${id}`,
    null,
    "delete"
  );
  return data;
};

export const MyVideosAPI = async ({ page = 1, size = 10 }) => {
  const data = await apiRequest(
    `/creators/my-actors?page=${page}&size=${size}`,
    null,
    "get"
  );
  return data;
};

// Creator Actors Management APIs (Admin routes)
export const assignActorToCreatorAPI = async (payload) => {
  const data = await apiRequest(
    "/creators/admin/assign-actor",
    payload,
    "post"
  );
  return data;
};

export const getCreatorActorsAPI = async (creatorId) => {
  const data = await apiRequest(
    `/creators/admin/creator-actors/${creatorId}`,
    null,
    "get"
  );
  return data;
};

export const removeActorFromCreatorAPI = async (assignmentId) => {
  const data = await apiRequest(
    `/creators/admin/remove-actor/${assignmentId}`,
    null,
    "delete"
  );
  return data;
};

// Payout Management APIs

// Admin Payout APIs
export const getCreatorEarningsSummaryAPI = async (
  creatorId,
  { startDate, endDate } = {}
) => {
  let url = `/creator-payouts/admin/creator/${creatorId}/earnings-summary`;

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const data = await apiRequest(url, null, "get");
  return data;
};

export const createPayoutAPI = async (payload) => {
  const data = await apiRequest(
    "/creator-payouts/admin/create",
    payload,
    "post"
  );
  return data;
};

export const updatePayoutStatusAPI = async (payoutId, payload) => {
  const data = await apiRequest(
    `/creator-payouts/admin/${payoutId}/status`,
    payload,
    "put"
  );
  return data;
};

export const getAllPayoutsAPI = async ({
  page = 1,
  size = 10,
  search = "",
}) => {
  const data = await apiRequest(
    `/creator-payouts/admin/all?page=${page}&size=${size}&search=${search}`,
    null,
    "get"
  );
  return data;
};

export const getPayoutByIdAPI = async (payoutId) => {
  const data = await apiRequest(
    `/creator-payouts/admin/${payoutId}`,
    null,
    "get"
  );
  return data;
};

export const deletePayoutAPI = async (payoutId) => {
  const data = await apiRequest(
    `/creator-payouts/admin/${payoutId}`,
    null,
    "delete"
  );
  return data;
};

export const resolvePayoutDisputeAPI = async (payoutId, payload) => {
  const data = await apiRequest(
    `/creator-payouts/admin/${payoutId}/resolve-dispute`,
    payload,
    "post"
  );
  return data;
};

// Creator Payout APIs
export const getMyPayoutsAPI = async ({ page = 1, size = 10 }) => {
  const data = await apiRequest(
    `/creator-payouts/my-payouts?page=${page}&size=${size}`,
    null,
    "get"
  );
  return data;
};

export const reportPayoutDisputeAPI = async (payoutId, payload) => {
  const data = await apiRequest(
    `/creator-payouts/${payoutId}/dispute`,
    payload,
    "post"
  );
  return data;
};

// Lipdub Shots API
export const getLipdubShotsAPI = async () => {
  const data = await apiRequest("/lipdub/shots", null, "get");
  return data;
};

export const getFreeTier = async () => {
  const data = await apiRequest("/free-tier", null, "get");
  return data;
};

export const updateFreeTier = async (payload) => {
  const data = await apiRequest("/free-tier/update", payload, "post");
  return data;
};
