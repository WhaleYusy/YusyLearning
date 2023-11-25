import request from "@/utils/request";
import type { HospitalResponseData } from "./type";

enum API {
  HOSPITAL_URL = "/hosp/hospital/",
  HOSPITALLEVELANDREGION_URL = "/cmn/dict/findByDictCode/",
}

export const reqHospital = (page: number, limit: number) =>
  request.get<any, HospitalResponseData>(`${API.HOSPITAL_URL}${page}/${limit}`);

export const reqHospitalLevelAndRegion = (dictCode: string) =>
  request.get(`${API.HOSPITALLEVELANDREGION_URL}${dictCode}`);
