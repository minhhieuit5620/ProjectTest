import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TinTuc_Data } from 'src/app/model/TinTuc/tin-tuc-data.model';
import { TinTuc_DTO } from 'src/app/model/TinTuc/tin-tuc-DTO.model';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TinTucService {

  constructor( private http: HttpClient) { }

  getall(data:TinTuc_DTO):Observable<TinTuc_DTO> {
    return this.http.post<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetAllTinTuc',data);
  }
  // getall():Observable<NhomCauHoi[]>{
  //   return this.http.post<NhomCauHoi[]>(environment.apiUrl+'/api/Nhom/GetAllNhomCauHoi');
  // }
  Add_NCH(data:TinTuc_DTO):Observable<TinTuc_DTO>{
    return this.http.post<TinTuc_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  getOne(id:Number) {
    return this.http.get<TinTuc_Data[]>(environment.apiUrl+'/api/TinTuc/GetTinTucByID/'+id);
  }
  getOne_(id:Number) {
    return this.http.get<TinTuc_Data>(environment.apiUrl+'/api/TinTuc/GetTinTucByID/'+id);
  }
  // get DL Khoa học công nghệ
  getKH_CN() {
    return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/1');
  }
  //get DL An toàn bức xạ và hạt nhân
  getATBX() {
    return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/2');
  }
  //get DL Sở Hữu trí tuệ
  getSHTT() {
    return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/3');
  }
    //get DL thông báo, công văn, kế hoạch
    getTC_DL_CL() {
      return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/4');
    }
  //get DL thông báo, công văn, kế hoạch
    getTBCV() {
    return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/5');
  }
//get DL giới thiệu
  getIntro() {
    return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/7');
  }

  Put_NCH(data:TinTuc_DTO):Observable<TinTuc_DTO>{
    return this.http.post<TinTuc_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }
  Delete_NCH(id:Number,data:TinTuc_DTO):Observable<TinTuc_DTO>{
    return this.http.post<TinTuc_DTO>(environment.apiUrl+'/api/CauHoi/Delete_CauHoi/'+id,data);
  }
}
