import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoanhNghiep_DTO } from 'src/app/model/DoanhNghiep/doanhNghiep.model';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { loaiHinhDNService } from 'src/app/Sevices/LoaiHinhDN/loaiHinhDN.service';
import { NganhKDService } from 'src/app/Sevices/NganhKD/nganhKD.service';
import { NganhKD_DTO } from 'src/app/model/NganhKD/nganhKD-DTO.model';
import { loaiHinhDN_DTO } from 'src/app/model/LoaiHinhDN/loaiHinhDN-DTO.model';
import { NganhKD_Data } from 'src/app/model/NganhKD/nganhKD-data.model';
import { loaiHinhDN_Data } from 'src/app/model/LoaiHinhDN/loaiHinhDN-data.model';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {


  // submitted = false;

  //  registerForm = this.formBuilder.group({

  //   maDoanhNghiep: new FormControl(0, [Validators.required]),
  //   maDinhDanhDN: new FormControl(0, [Validators.required, Validators.minLength(6)]),
  //   tenToChuc: new FormControl('', [ Validators.required]),
  //   diaChi:new FormControl('', [ Validators.required]),
  //   tinhThanh:new FormControl(''),
  //   dienThoai:new FormControl('', [ Validators.required]),
  //   email:new FormControl('', [ Validators.required]),
  //   website:new FormControl(''),
  //   nguoiDungDau:new FormControl(''),
  //   maNganh: new FormControl(1, [ Validators.required]),
  //   maLoaiHinh: new FormControl(1, [ Validators.required]),
  //   quyMo:new FormControl('', [ Validators.required]),
  //   tieuDe:new FormControl(''),
  //   moTa:new FormControl(''),
  //   trangThai: new FormControl(1, [Validators.required]),
  //   provincesRcd: new FormControl(1, [Validators.required]),
  //   districtsRcd: new FormControl(1, [Validators.required]),
  //   wardsRcd: new FormControl(1, [Validators.required]),
  //   nguoiTao:new FormControl(''),
  //   ngayTao:new FormControl(new Date),
  //   ngaySua:new FormControl(new Date),
  //   nguoiSua:new FormControl('')
   

   
  //   // dayStart: new FormControl('', [ Validators.required]),
  //   // rol: new FormControl(1, [ Validators.required]),
  //   // userName:new FormControl('', [ Validators.required]),
  //   // //title: new FormControl('', [ Validators.required]),
  //   // password: ['', [Validators.required, Validators.minLength(6)]],
  //   // confirmPassword: ['', Validators.required],
  //   },)


  
  form: any = {   
    maDoanhNghiep:0,
    maDinhDanhDN: 0,
    taiKhoan:' ',
    matKhau:' ',
    tenToChuc:' ',
    diaChi:' ',
    tinhThanh:' ',
    dienThoai:' ',
    email:' ',
    website:' ',
    nguoiDungDau:' ',
    maNganh:1,
    maLoaiHinh:1,
    quyMo:' ',
    tieuDe:' ',
    moTa:' ',
    trangThai:1,
  rol:1,
    nguoiTao:' ',
    ngayTao:new Date,
    nguoiSua:' ',
    ngaySua:new Date

  };

  dl:DoanhNghiep_DTO={ Data:{maDoanhNghiep: 0,maDinhDanhDn: 0,taiKhoan:' ',matKhau:' ',tenToChuc: ' ', diaChi:' ',tinhThanh:' ', dienThoai: ' ' ,email: ' ' ,website: ' ' ,nguoiDungDau: ' ' ,maNganh: 0 ,maLoaiHinh: 0,quyMo: ' ' ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:10, pageIndex:1} };
  dlForm:DoanhNghiep_DTO={ Data:this.form
  ,Page:{pageSize:10, pageIndex:1} };

  dlNganh:NganhKD_DTO={Data:{maNganh:0,tenNganh:' ',trangThai:0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }    
  ,Page:{pageSize:500, pageIndex:1}};

  dlLoaiHinhDN:loaiHinhDN_DTO={Data:{maLoaiHinh:0,tenLoaiHinh:' ',trangThai:0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }    
  ,Page:{pageSize:10, pageIndex:1}};

  dataNganh_DTO:NganhKD_Data[];
  dataLoaiHinh:loaiHinhDN_Data[];
 // data_50: CauHoi_Data[];
  data_DTO:DoanhNghiep_DTO[]=[];
  errorMessage = ''; 

  constructor(
    private DNService:doanhNghiepService,
    private loaiHinhDNService: loaiHinhDNService,
    private nganhKDService:NganhKDService,
    private formBuilder: FormBuilder ,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAllNganhKD();
    this.getAllLoaiHinhDn();
  }

  getAllNganhKD(){
    this.nganhKDService.getall(this.dlNganh).subscribe((res: any) => {
      this.dataNganh_DTO = res.data;  
      console.log(this.dataNganh_DTO)
    })
  }
  getAllLoaiHinhDn(){
    this.loaiHinhDNService.getall(this.dlLoaiHinhDN).subscribe((res: any) => {
      this.dataLoaiHinh = res.data;  
      console.log(this.dataLoaiHinh)
    })
  }
  // register 
  Submit():void{
    this.DNService.Add_DN(this.dlForm).subscribe(
      (datas)=>{
        this.data_DTO.push(datas)
        this.route.navigate(['/']);
      },   
    (err) => {
      console.log("errorMessage");
            this.errorMessage = err.error.message;
           // this.isLoginFailed = true;
   
    
       
       }
    );
  }


  // get f() { return this.registerForm.controls; }





  // registerUser(){   
  //   this.DNService.Add_DN(this.dl).subscribe(
  //     (datas)=>{
  //       this.data_DTO.push(datas)
  //       this.route.navigate(['/']);
  //     },   
  //   (err) => {
  //     console.log("errorMessage");
  //           this.errorMessage = err.error.message;
  //          // this.isLoginFailed = true;
   
    
       
  //      }
  //   );
  // }

  // register(){
  //   this.submitted = true;
  //   if (this.registerForm.invalid) {
  //     return;
  //   }
  //   this.DNService.Add_DN(this.dlForm).subscribe(
  //     (datas)=>{
  //       this.data_DTO.push(datas)
  //       this.route.navigate(['/']);
  //     },   
  //   (err) => {
  //     console.log("errorMessage");
  //           this.errorMessage = err.error.message;
  //          // this.isLoginFailed = true;
   
    
       
  //      }
  //   );
  // }

}
