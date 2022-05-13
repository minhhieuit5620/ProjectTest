import { Component, Input, OnInit } from '@angular/core';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { CauHoiService } from 'src/app/Sevices/CauHoi/cau-hoi.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  
  @Input() data_getone: CauHoi_Data;
  data: CauHoi_Data[];
  data1: CauHoi_Data[];
  data_Answer:LuaChon_Data[];
 // data_getone: CauHoi_Data;
  DL_CH: CauHoi_DTO = {
    Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 60, pageIndex: 1 }
  };
  constructor(private CauHoiService: CauHoiService) { }

  ngOnInit(): void {
    this.getCauHoi();

    this.getKS();
    
  }
  getCauHoi() {
    this.CauHoiService.getall(this.DL_CH).subscribe((res: any) => {
      this.data = res.data
      console.log(this.data);
    })
  }


  getKS(){
    this.CauHoiService.getks().subscribe((res:any)=>{
      this.data1=res.data;
      console.log(this.data1);
    })
  }


  getDapAn(id:number){
    this.CauHoiService.getAnswers(id).subscribe((res:any)=>{
      this.data_Answer=res.data;
      console.log("data dap an : ",this.data_Answer);
    })
  }

  getOne(id:number){
    
    this.CauHoiService.getOne(id).subscribe((res:any)=>{
     
    this.data_getone=res;
    console.log(this.data_getone);
    })
  }

}
