import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NhomCauHoi_Data } from 'src/app/model/NhomCauHoi/nhom-cau-hoi-data.model';
import { NhomCauHoi_DTO } from 'src/app/model/NhomCauHoi/nhom-cau-hoi.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NhomCauHoiService {

  constructor( private http: HttpClient) { }

  getall(data:NhomCauHoi_DTO):Observable<NhomCauHoi_DTO> {
    return this.http.post<NhomCauHoi_DTO>(environment.apiUrl+'/api/Nhom/GetAllNhomCauHoi',data);
  }
  // getall():Observable<NhomCauHoi[]>{
  //   return this.http.post<NhomCauHoi[]>(environment.apiUrl+'/api/Nhom/GetAllNhomCauHoi');
  // }
  Add_NCH(data:NhomCauHoi_DTO):Observable<NhomCauHoi_DTO>{
    return this.http.post<NhomCauHoi_DTO>(environment.apiUrl+'/api/Nhom/Add_Or_Update',data);
  }
  getOne(id:Number) {
    return this.http.get<NhomCauHoi_Data[]>(environment.apiUrl+'/api/Nhom/GetNhomCauHoiById/'+id);
  }
  Put_NCH(data:NhomCauHoi_DTO):Observable<NhomCauHoi_DTO>{
    return this.http.post<NhomCauHoi_DTO>(environment.apiUrl+'/api/Nhom/Add_Or_Update',data);
  }
  Delete_NCH(id:Number,data:NhomCauHoi_DTO):Observable<NhomCauHoi_DTO>{
    return this.http.post<NhomCauHoi_DTO>(environment.apiUrl+'/api/Nhom/Delete_NhomCauHoi/'+id,data);
  }
}
