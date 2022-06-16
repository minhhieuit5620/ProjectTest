import { Component, Input, OnInit } from '@angular/core';
import { User_Data } from 'src/app/model/User/user-data.model';
import { User_DTO } from 'src/app/model/User/user-DTO.model';
import { UserService } from 'src/app/Sevices/User/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() data_getone:User_Data;
  

  form: any = {
    tmp: null,   
  };

  total:any;
  currentPage:number=1;


  data:User_Data[];
  data_DTO:User_DTO[]=[];
  DTO:User_DTO; 
  NCH_data:User_Data={id: 0,taiKhoan: ' ', matKhau:' ',trangThai:1, hoVaTen: ' ',soDienThoai:' ',email:' ',rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
  dl:User_DTO={ Data:{id: 0,taiKhoan: ' ', matKhau:' ',trangThai:1, hoVaTen: ' ',soDienThoai:' ',email:' ',rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:60, pageIndex:1} };

  
  advancedPagination: number;
  isDisabled: boolean;
  constructor(   
    private UserService: UserService,
  ) {
    this.advancedPagination = 1;
    this.isDisabled = true;
   }

  ngOnInit(): void {
    this.GetAll(1);
  }

  

  GetAll(a:number){    
    this.dl={ Data:{id: 0,taiKhoan: ' ', matKhau:' ',trangThai:1, hoVaTen: ' ',soDienThoai:' ',email:' ',rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:a} };
    this.UserService.getall(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
     // console.log('DTO', this.total);
    })
  }
  Search(a:number){
    this.dl={ Data:{id: 0,taiKhoan: 'Nhập tài khoản', matKhau:'Mật khẩu',trangThai:1, hoVaTen: ' ',soDienThoai:' ',email:' ',rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:a} };
    if(this.form.tmp!=null){
      this.UserService.searchUser(this.form.tmp,this.dl).subscribe((res:any)=>{
        this.data=res.data;
        this.currentPage = a;
        this.total=res.pages;  })
    }else{
      this.GetAll(a);
    }
   
      //console.log('DTO', this.total);
  
  }

  Add():any{
    this.UserService.Add_User(this.dl).subscribe(datas=>{this.data_DTO.push(datas)})
     this.GetAll(1);
  }

  getOne(id:number){
    
    this.UserService.getOne(id).subscribe((res:any)=>{
     
    this.data_getone=res;
    console.log(this.data_getone);
    })
  }
  update(id:number,taiKhoan:string,hoTen:string,dienThoai:string,email:string):any {
    this.dl=this.dl={ Data:{id:id,taiKhoan: taiKhoan, matKhau:' ',trangThai:1, hoVaTen: hoTen,soDienThoai:dienThoai,email:email,rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:1} };
    this.UserService.Put_User(this.dl).subscribe   
      (data => {
       window.location.reload();
      })   
  }

  counter(i: number) {
    return new Array(i);
}

  Put(){

  }
  delete_NCH(id:number){
    this.UserService.Delete_User(id,this.dl).subscribe(
      (data:any) => {
        console.log(id);
        
      },
      (error) => {
      
        console.log(error);
      }
    );
  }



  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
}
}
