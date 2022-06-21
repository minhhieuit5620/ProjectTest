import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { dotKhaoSat_Data } from 'src/app/model/DotKhaoSat/dotKhaoSat-Data.model';
import { dotKhaoSat_DTO } from 'src/app/model/DotKhaoSat/dotKhaoSat.model';
import { DotKhaoSatService } from 'src/app/Sevices/DotKhaoSat/dotKhaoSat.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dot-khao-sat',
  templateUrl: './dot-khao-sat.component.html',
  styleUrls: ['./dot-khao-sat.component.css']
})
export class DotKhaoSatComponent implements OnInit {

  @Input() data_getone:dotKhaoSat_Data;
  public editor = ClassicEditor;
  form: any = {
    tmp: null,   
  };

  myForm:any={

  }
  link=environment.apiUrl;
  total:any;
  currentPage:number=1;
  
  data_DTO:dotKhaoSat_DTO[]=[];
 
  data:dotKhaoSat_Data[];
  // data_getone: CauHoi_Data;
   dl: dotKhaoSat_DTO = {Data: { maDotKhaoSat: 0,  tenDotKhaoSat: ' ', moTa: ' ', ngayBatDau:new Date,ngayKetThuc:new Date, trangThai: 1,fileBaoCaoKetQua:' ', maNguoitao: 0, ngaytao: new Date, maNguoiSua: 0, ngaySua: new Date ,fileQuyetDinh:' ',fileKeHoach:' '}
     , Page: {  pageIndex: 1 }};
  

  constructor(   
    private dotKhaoSatServices: DotKhaoSatService,
    private toastr:ToastrService,
  ) {
  
   }

  ngOnInit(): void {
    this.GetAll(1);
  }

  

  GetAll(a:number){    
    this.dl={ Data: { maDotKhaoSat: 0,  tenDotKhaoSat: ' ', moTa: ' ', ngayBatDau:new Date,ngayKetThuc:new Date, trangThai: 1,fileBaoCaoKetQua:' ', maNguoitao: 0, ngaytao: new Date, maNguoiSua: 0, ngaySua: new Date ,fileQuyetDinh:' ',fileKeHoach:' '}
    ,Page:{ pageIndex:a} };
    this.dotKhaoSatServices.getall(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
    })
  }
  Search(a:number){
    this.dl={ Data: { maDotKhaoSat: 0,  tenDotKhaoSat: ' ', moTa: ' ', ngayBatDau:new Date,ngayKetThuc:new Date, trangThai:1,fileBaoCaoKetQua:' ', maNguoitao: 0, ngaytao: new Date, maNguoiSua: 0, ngaySua: new Date ,fileQuyetDinh:' ',fileKeHoach:' '}
    ,Page:{ pageIndex:a} };
    if(this.form.tmp!=null){
      this.dotKhaoSatServices.search(this.form.tmp,this.dl).subscribe((res:any)=>{
        this.data=res.data;
        this.currentPage = a;
        this.total=res.pages;  })
    }else{
      this.GetAll(a);
    }
   
  
  }
  Add():any{    
    this.dotKhaoSatServices.Add(this.dl).subscribe(datas=>{
      this.data_DTO.push(datas)
      this.toastr.success("Thêm thành công")
      this.GetAll(1);
    })
 
   
  }
  getOne(id:number){    
    this.dotKhaoSatServices.getOne(id).subscribe((res:any)=>{     
    this.data_getone=res;  
    })
  }

  update(id:number,tenDotKS:string,mota:string,trangThai:number,ngayBatDau:Date,ngayKetThuc:Date,fileBaoCaoKetQua:string,fileQuyetDinh:string,fileKeHoach:string):any {
    this.dl={ Data: { maDotKhaoSat: id,  tenDotKhaoSat: tenDotKS, moTa: mota, ngayBatDau:ngayBatDau,ngayKetThuc:ngayKetThuc, trangThai:trangThai,fileBaoCaoKetQua:fileBaoCaoKetQua, maNguoitao: 0, ngaytao: new Date, maNguoiSua: 0, ngaySua: new Date ,fileQuyetDinh:fileQuyetDinh,fileKeHoach:fileKeHoach}
    ,Page:{ pageIndex:1} };
    this.dotKhaoSatServices.Put(this.dl).subscribe   
      (data => {
        this.toastr.success("Sửa thành công")
        this.GetAll(1);

      })   
  }

  counter(i: number) {
    return new Array(i);
}

delete_DKS(id:number){
    this.dotKhaoSatServices.Deleteks(id,this.dl).subscribe(
      (data:any) => {
        this.toastr.success("Xóa thành công");
        this.GetAll(1);
      },
      (error) => {      
        this.toastr.warning("Xóa thất bại")
        console.log(error);
      }
    );
  }

  uploadBaoCao(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.dotKhaoSatServices.UploadPhoto(formData).subscribe((data:any)=>{      
     this.dl.Data.fileBaoCaoKetQua=data.toString(); 
    })
  }
  uploadQD(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.dotKhaoSatServices.UploadPhoto(formData).subscribe((data:any)=>{      
     this.dl.Data.fileQuyetDinh=data.toString(); 
    })
  }
  uploadKH(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.dotKhaoSatServices.UploadPhoto(formData).subscribe((data:any)=>{      
     this.dl.Data.fileKeHoach=data.toString(); 
    })
  }


}
