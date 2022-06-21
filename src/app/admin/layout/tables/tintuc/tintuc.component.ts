import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TinTuc_Data } from 'src/app/model/TinTuc/tin-tuc-data.model';
import { TinTuc_DTO } from 'src/app/model/TinTuc/tin-tuc-DTO.model';
import { TinTucService } from 'src/app/Sevices/TinTuc/tin-tuc.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {
  @Input() data_getone:TinTuc_Data;
  
  public editor = ClassicEditor;
  form: any = {
    tmp: null,   
  };

  total:any;
  currentPage:number=1;

  data_DTO:TinTuc_DTO[]=[];
  data:TinTuc_Data[];
  // data_getone: CauHoi_Data;
   dl: TinTuc_DTO = {
     Data: { maTinTuc: 0, maLoaiTin: 0, tieuDe: ' ', mota: ' ', hinhAnh: ' ', trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
     , Page: { pageSize: 4, pageIndex: 1 }
   };
  

  constructor(   
    private tinTucService: TinTucService,
    private toastr:ToastrService,
  ) {
  
   }

  ngOnInit(): void {
    this.GetAll(1);
  }

  

  GetAll(a:number){    
    this.dl={ Data:{maTinTuc: 0, maLoaiTin: 0, tieuDe: ' ', mota: ' ', hinhAnh: ' ', trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    ,Page:{pageSize:60, pageIndex:a} };
    this.tinTucService.getall(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
     // console.log('DTO', this.total);
    })
  }
//   Search(a:number){
//     this.dl={ Data:{id: 0,taiKhoan: 'Nhập tài khoản', matKhau:'Mật khẩu',trangThai:1, hoVaTen: ' ',soDienThoai:' ',email:' ',rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
//     ,Page:{pageSize:60, pageIndex:a} };
//     if(this.form.tmp!=null){
//       this.UserService.searchUser(this.form.tmp,this.dl).subscribe((res:any)=>{
//         this.data=res.data;
//         this.currentPage = a;
//         this.total=res.pages;  })
//     }else{
//       this.GetAll(a);
//     }
   
//       //console.log('DTO', this.total);
  
//   }

  Add():any{
    this.tinTucService.Add_TT(this.dl).subscribe(datas=>{this.data_DTO.push(datas)})
    this.toastr.success("Thêm thành công")
     this.GetAll(1);    
  }

  getOne(id:number){
    
    this.tinTucService.getOne(id).subscribe((res:any)=>{
     
    this.data_getone=res;
   
    //console.log(this.data_getone);
    })
  }
  update(id:number,maLoaiTin:number,tieuDe:string,mota:string,trangThai:number,hinhAnh:string):any {
    this.dl={ Data:{maTinTuc: id, maLoaiTin: maLoaiTin, tieuDe: tieuDe, mota: mota, hinhAnh: hinhAnh, trangThai: trangThai, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    ,Page:{pageSize:60, pageIndex:1} };
    
    this.tinTucService.Put_TT(this.dl).subscribe   
      (data => {
        this.toastr.success("Sửa thành công")
        this.GetAll(1);
      //  $('#Sua').modal('hide');
      })   
  }

  counter(i: number) {
    return new Array(i);
}

//   Put(){

//   }
  delete_TT(id:number){
    this.tinTucService.Delete_TT(id,this.dl).subscribe(
      (data:any) => {
        //console.log(id);
        
        this.toastr.success("Xóa thành công");
        this.GetAll(1);
      //  $('#Xoa').modal('hide');
      },
      (error) => {
      
        this.toastr.warning("Xóa thất bại")
       // $('#Xoa').modal('hide');
        console.log(error);
      }
    );
  }


  selectedLoai: string = '';  
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedLoai = event.target.value;
  }
  uploadMT(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.tinTucService.UploadPhoto(formData).subscribe((data:any)=>{      
     this.dl.Data.mota=data.toString(); 
    })
  }
  uploadIMG(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.tinTucService.UploadPhoto(formData).subscribe((data:any)=>{      
     this.dl.Data.hinhAnh=data.toString(); 
    })
  }

}
