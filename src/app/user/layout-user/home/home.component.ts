import { Component, Input, OnInit } from '@angular/core';
import { TinTuc_Data } from 'src/app/model/TinTuc/tin-tuc-data.model';
import { TinTuc_DTO } from 'src/app/model/TinTuc/tin-tuc-DTO.model';
import { TinTucService } from 'src/app/Sevices/TinTuc/tin-tuc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  link=environment.apiUrl;

  @Input() data_getone: TinTuc_Data;
  data: TinTuc_Data[];
  data_KHCN: TinTuc_Data[];
  data_ATBX: TinTuc_Data[];
  data_SHTT: TinTuc_Data[];
  data_TBCV:TinTuc_Data[];
  data_TC_DL_CL:TinTuc_Data[];
  data_Answer:TinTuc_Data[];
 // data_getone: CauHoi_Data;
  DL_CH: TinTuc_DTO = {
    Data: { maTinTuc: 0, maLoaiTin: 0, tieuDe: ' ', mota: ' ', hinhAnh: ' ', trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 4, pageIndex: 1 }
  };
  constructor(private TinTucService: TinTucService) { }

  ngOnInit(): void {
    this.getTinTuc();

    this.getTin_KHCN();
    this.getTin_ATBX();
    this.getTin_SHTT();
    this.getTin_TC_DL_CL();
    this.getTin_TBCV();
    
  }
  getTinTuc() {
    this.TinTucService.getall(this.DL_CH).subscribe((res: any) => {
      this.data = res.data     
    })
  }


  getTin_KHCN(){
    this.TinTucService.getKH_CN().subscribe((res:any)=>{
      this.data_KHCN=res.data;
    })
  }
  getTin_ATBX(){
    this.TinTucService.getATBX().subscribe((res:any)=>{
      this.data_ATBX=res.data;
    })
  }
  getTin_SHTT(){
    this.TinTucService.getSHTT().subscribe((res:any)=>{
      this.data_SHTT=res.data;
    })
  }
  getTin_TC_DL_CL(){
    this.TinTucService.getTC_DL_CL().subscribe((res:any)=>{
      this.data_TC_DL_CL=res.data;
    })
  }
  getTin_TBCV(){
    this.TinTucService.getTBCV().subscribe((res:any)=>{
      this.data_TBCV=res.data;
    })
  }

  // getDapAn(id:number){
  //   this.CauHoiService.getAnswers(id).subscribe((res:any)=>{
  //     this.data_Answer=res.data;
  //     console.log("data dap an : ",this.data_Answer);
  //   })
  // }

  getOne(id:number){
    
    this.TinTucService.getOne(id).subscribe((res:any)=>{
     
    this.data_getone=res;
    })
  }

}
