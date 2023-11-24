import request from "@/utils/request";

enum API {
  HOSPITAL_URL = "/hosp/hospital/",
}

export const reqHospital = (page: number, limit: number) => {
  return request.get(`${API.HOSPITAL_URL}/${page}/${limit}`);
};
