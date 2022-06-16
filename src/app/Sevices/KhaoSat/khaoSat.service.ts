import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { KhaoSat_DTO } from 'src/app/model/KhaoSat/khaoSat-DTO.model';
import { khaoSat } from 'src/app/model/KhaoSat/khaoSat.model';
import { CTKS_DN_CH_LC } from 'src/app/model/KhaoSat_DN/CTKS_DN_CH_LC.model';
import { khaoSat_DN } from 'src/app/model/KhaoSat_DN/khaoSat_DN.model';
import { CT_KhaoSatMn } from 'src/app/model/KhaoSat_Mn/chiTietKhaoSat_MN.model';
import { khaoSatMn_DTO } from 'src/app/model/KhaoSat_Mn/khaoSatMN-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KhaoSatService {

  constructor( private http: HttpClient) {

}


// get dữ liệu
  getall(data:CauHoi_DTO):Observable<CauHoi_DTO> {
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetAllCauHoi',data);
  }


  Add_KS(data:khaoSat){
    return this.http.post<khaoSat>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  // themHoaDon(order:any){
  //   return this.http.post<Orders>(this.baseURL,order);    
  //  }
  //  themDetail(detail:any[]){
  //    return this.http.post<orderDetail>(this.baseURL,detail);
  //  }

  Post_Ks(a:any){
    console.log(a)
    this.http.post<KhaoSat_DTO>(environment.apiUrl+'/api/KhaoSat_DTO',a).subscribe({
      next: function(){console.log("successful!")},
      error:function(){console.log("Lỗi rồi, code lại")}
   });
  }
  

  Post_CtKs(CtKhaoSat:any[]){
    return this.http.post<khaoSat>(environment.apiUrl+'/api/KhaoSat_DTO',CtKhaoSat);
  }


  //manage KhaoSat
  getAllKS(data:khaoSatMn_DTO):Observable<khaoSatMn_DTO> {
    return this.http.post<khaoSatMn_DTO>(environment.apiUrl+'/api/KhaoSat/GetAllKhaoSat',data);
  }
  getCTKS(id:number){
    return this.http.get<CT_KhaoSatMn>(environment.apiUrl+'/api/KhaoSat/GetCTKSByMaKS/'+id);
   // return this.http.get<TinTuc_DTO>(environment.apiUrl+'/api/TinTuc/GetTinTucByMaLoai/5');
  }

  //KhaoSat_DN
  getKhaoSat_DN(data_KS:khaoSat_DN){
    return this.http.post<khaoSat_DN>(environment.apiUrl+'/api/DoanhNghiep/GetKhaoSat_DN',data_KS);
  }
  getCTKS_CH_LC(idCT:number){
    return this.http.get<CTKS_DN_CH_LC>(environment.apiUrl+'/api/CTKS/GetCTKSByMaKS/'+idCT);
  }
  deleteKhaoSat(id:number,data:khaoSatMn_DTO):Observable<khaoSatMn_DTO>{
    return this.http.post<khaoSatMn_DTO>(environment.apiUrl+'/api/KhaoSat/Delete_KhaoSat/'+id,data);
  }
  deleteCTKS(id:number,data:CT_KhaoSatMn):Observable<CT_KhaoSatMn>{
    return this.http.post<CT_KhaoSatMn>(environment.apiUrl+'/api/KhaoSat/Delete_CTKhaoSat/'+id,data);
  }
 
}
