import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lienHe_Data } from 'src/app/model/LienHe/lienHe-Data.model';
import { lienHe_DTO } from 'src/app/model/LienHe/lienHe.model';
import { NhomCauHoi_Data } from 'src/app/model/NhomCauHoi/nhom-cau-hoi-data.model';
import { NhomCauHoi_DTO } from 'src/app/model/NhomCauHoi/nhom-cau-hoi.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LienHeService {

  constructor( private http: HttpClient) { }

  getall(data:lienHe_DTO):Observable<lienHe_DTO> {
    return this.http.post<lienHe_DTO>(environment.apiUrl+'/api/LienHe/GetAllLienHe',data);
  }

  searchLH(search:string,data:lienHe_DTO):Observable<lienHe_DTO>{
    return this.http.post<lienHe_DTO>(environment.apiUrl+'/api/LienHe/SearchLienHe/'+search,data);
  }
 
  Add_LH(data:lienHe_DTO):Observable<lienHe_DTO>{
    return this.http.post<lienHe_DTO>(environment.apiUrl+'/api/LienHe/Add_Or_Update',data);
  }
  getOne(id:Number) {
    return this.http.get<lienHe_Data[]>(environment.apiUrl+'/api/LienHe/GetLienHeById/'+id);
  }
  Put_LH(data:lienHe_DTO):Observable<lienHe_DTO>{
    return this.http.post<lienHe_DTO>(environment.apiUrl+'/api/LienHe/Add_Or_Update',data);
  }
  Delete_LH(id:Number,data:lienHe_DTO):Observable<lienHe_DTO>{
    return this.http.post<lienHe_DTO>(environment.apiUrl+'/api/LienHe/Delete_LienHe/'+id,data);
  }
}
