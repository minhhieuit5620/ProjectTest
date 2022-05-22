import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauHoiService {

  private itemsSubject = new BehaviorSubject<any[]>([]);
  item = this.itemsSubject.asObservable();
  constructor( private http: HttpClient) {
    
    let local_storage = JSON.parse(localStorage.getItem('answer')|| '{}');
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage);
   }


 // Add đáp án
 addAnswer(CauHoi:CauHoi_Data,DapAn:LuaChon_Data) {
  // product.Quantity = 1;
  let local_storage:any;
  if (localStorage.getItem('answer') == null) {
    local_storage = [CauHoi,DapAn];
  } else {
    local_storage = JSON.parse(localStorage.getItem('answer')|| '{}');
    let ok = true;
    for (let x of local_storage) {
      // if (x.idProduct == product.Id) {
      //   x.quantity += 1;
      //   ok = false;
      //   break;
      // }
    }
    if(ok){
      local_storage.push(CauHoi,DapAn);
    }
  }
  localStorage.setItem('answer', JSON.stringify(local_storage));
  this.itemsSubject.next(local_storage);
}


// get dữ liệu
  getall(data:CauHoi_DTO):Observable<CauHoi_DTO> {
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetAllCauHoi',data);
  }
  // getall():Observable<NhomCauHoi[]>{
  //   return this.http.post<NhomCauHoi[]>(environment.apiUrl+'/api/Nhom/GetAllNhomCauHoi');
  // }
  Add_NCH(data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }

  getOne(id:Number) {
    return this.http.get<CauHoi_Data[]>(environment.apiUrl+'/api/CauHoi/GetCauHoiById/'+id);
  }

  
  getCauHoi_50() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/50');
  }
  getCauHoi_51() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/51');
  }
  getCauHoi_52() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/52');
  }
  getCauHoi_53() {
    return this.http.get<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/GetCauHoiByMaNhom/53');
  }

  //Get cau hoi
  getAnswers(id:number){
    return this.http.get<LuaChon_DTO>(environment.apiUrl+'/api/LuaChon/GetLuaChonByMaCH/'+id)
  }

  


  Put_NCH(data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Add_Or_Update',data);
  }
  Delete_NCH(id:Number,data:CauHoi_DTO):Observable<CauHoi_DTO>{
    return this.http.post<CauHoi_DTO>(environment.apiUrl+'/api/CauHoi/Delete_CauHoi/'+id,data);
  }
}
