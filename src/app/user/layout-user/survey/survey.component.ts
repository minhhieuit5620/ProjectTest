import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { CauHoi_LuaChon_DTO } from 'src/app/model/CauHoi/CauHoi_LuaChon_DTO.model';
import { doanhNghiep_Data } from 'src/app/model/DoanhNghiep/doanhNghiep-Data.model';
import { KhaoSat_DTO } from 'src/app/model/KhaoSat/khaoSat-DTO.model';
import { khaoSat } from 'src/app/model/KhaoSat/khaoSat.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { CauHoi_DTOService } from 'src/app/Sevices/CauHoi/cau-hoi-DTO.service';
import { CauHoiService } from 'src/app/Sevices/CauHoi/cau-hoi.service';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';
import { KhaoSatService } from 'src/app/Sevices/KhaoSat/khaoSat.service';
import { ToastrService } from 'ngx-toastr';
import { dotKhaoSat_DTO } from 'src/app/model/DotKhaoSat/dotKhaoSat.model';
import { DotKhaoSatService } from 'src/app/Sevices/DotKhaoSat/dotKhaoSat.service';
import { dotKhaoSat_Data } from 'src/app/model/DotKhaoSat/dotKhaoSat-Data.model';
declare var $: any;
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  @HostListener('window:beforeunload')
 



  @ViewChild('traloi',{static:true}) traloi:ElementRef<HTMLButtonElement>;
  @Input() data_getone: CauHoi_Data;data_getDN:doanhNghiep_Data;data_getDotKS:dotKhaoSat_Data
  user=localStorage.getItem('auth-user');
  [x: string]: any;

  data: CauHoi_Data[];
  dataKS: CauHoi_Data[];
  data_50: CauHoi_Data[];
  data_51: CauHoi_Data[];
  data_52: CauHoi_Data[];
  data_53: CauHoi_Data[];
  id_cauHoi: number;
  arr_de: {[key: number] : any};

  newarr: { 
    macauhoi: 0,
    dapan: { id: 0}
  }
  data_Answer: LuaChon_Data[];

  arr: LuaChon_Data[];
  // data_getone: CauHoi_Data;
  DL_CH: CauHoi_DTO = {
    Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 60, pageIndex: 1 }
  };

  //KhaoSat
  khaoSat:khaoSat={maKhaoSat: 0,maDoanhNghiep: 1,ngayDanhGia:new Date,ngaySua: new Date,nguoiSua: ' ',maDotKhaoSat: 1,trangThai: 1}
  KhaoSat_DTO:KhaoSat_DTO={KhaoSat:{maKhaoSat: 0,maDoanhNghiep: 1,ngayDanhGia:new Date,ngaySua: new Date,nguoiSua: ' ',maDotKhaoSat: 1,trangThai: 1}, 
  CTKS:[]}

  ctks1:any[]=[];

 


  data_CH_LC_DTO: CauHoi_LuaChon_DTO[];
  // @Input()
  data_CH_LC_DTO_getone: CauHoi_LuaChon_DTO[];
  DL_CH_LC_DTO: CauHoi_LuaChon_DTO = {
    maCauHoi: 0,
    noiDung: ' ',
    goiYcauHoi: ' ',
    maLoaiCauHoi: 0,
    maNhomCauHoi: 0,
    nguoiThem: ' ',
    ngayThem: new Date,
    ngaySua: new Date,
    nguoiSua: ' ',
    trangThai: 0,
    maLuaChon: 0,
    maCauHoi_LC: 0,
    noiDung_LC: ' ',
    trangThai_LC: 0
  };

  //dotKhaoSat
  dotKS: dotKhaoSat_DTO = {Data: { maDotKhaoSat: 0,  tenDotKhaoSat: ' ', moTa: ' ', ngayBatDau:new Date,ngayKetThuc:new Date, trangThai: 1,fileBaoCaoKetQua:' ', maNguoitao: 0, ngaytao: new Date, maNguoiSua: 0, ngaySua: new Date ,fileQuyetDinh:' ',fileKeHoach:' '}
  , Page: {  pageIndex: 1 }};
  data_dotKS: dotKhaoSat_Data[];

  form: FormGroup;
activeIndex: number;

  constructor(
    private CauHoiService: CauHoiService,
    private CauHoi_DTO_Service: CauHoi_DTOService,
   private KS_Service: KhaoSatService,
   private dNghiepService:doanhNghiepService,
   private dotKS_Service:DotKhaoSatService,
   private route: Router,
   private toastr:ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getDN();
    this.getDotKhaoSat();
    this.getKS();

    this.arr_de = {};
    this.getAllCauHoi();
    this.getKS_50();
    this.getKS_51();
    this.getKS_52();
    this.getKS_53();
    this.getOneDotKS();

  }
  

  getDN(){
    if(this.user){
      this.dNghiepService.getByName(this.user).subscribe((res: any) => {
           this.data_getDN = res;
           //console.log('maDN',this.arr_de);
          });    
    }
  }
  getDotKhaoSat(){
    this.dotKS_Service.getall(this.dotKS).subscribe((res: any) => {
      this.data_dotKS = res.data    
      console.log(this.data_dotKS);
    })
  }
  trackByFn(index:number, movie:any): number {
    console.log( movie.id);
    return movie.id;

  }

  // selectedLoai: string = '';  
  // selectChangeHandler (event: any) {
  //   //update the ui
  //   this.selectedLoai = event.target.value;
  // }
  selectedDevice = 1;
  onChange(deviceValue:any) {
    console.log(deviceValue);
    this.selectedDevice =  deviceValue.target.value;
    console.log(this.selectedDevice);
    document.getElementById('hien')?.classList.remove("an");
  }
  start(){
    document.getElementById('chay')?.classList.add("an");
  }
  getOneDotKS(){
    this.dotKS_Service.getOne(this.selectedDevice).subscribe((res: any) => {        
      this.data_getDotKS = res;
      console.log(this.data_getDotKS);
    })
  }
  // getCauHoiDTO(){
  //   this.CauHoi_DTO_Service.getall(this.DL_CH_LC_DTO).subscribe((res:any)=>{
  //     this.data_CH_LC_DTO=res.data;
  //     console.log('CauHoi luachon',this.data_CH_LC_DTO);
  //   })
  // }

  // getOneCauHoiDTO(id:number){
  //   this.CauHoi_DTO_Service.getOne_DTO(id).subscribe((res:any)=>{
  //     this.data_CH_LC_DTO_getone=res;

  //     console.log('data  ',this.data_CH_LC_DTO_getone);
  //   })
  // }
  getKS() {
    this.CauHoiService.getKS(this.DL_CH).subscribe((res: any) => {
      this.dataKS = res.data
    
    })
  }

  getAllCauHoi() {
    this.CauHoiService.getall(this.DL_CH).subscribe((res: any) => {
      this.data = res.data
    
    })
  }


  getKS_50() {
    this.CauHoiService.getCauHoi_50().subscribe((res: any) => {
      this.data_50 = res.data;
   
    })
  }
  getKS_51() {
    this.CauHoiService.getCauHoi_51().subscribe((res: any) => {
      this.data_51 = res.data;
  
    })
  }
  getKS_52() {
    this.CauHoiService.getCauHoi_52().subscribe((res: any) => {
      this.data_52 = res.data;
  
    })
  }
  getKS_53() {
    this.CauHoiService.getCauHoi_53().subscribe((res: any) => {
      this.data_53 = res.data;
     
    })
  }


  getDapAn(id: number) {

    this.CauHoiService.getAnswers(id).subscribe((res: any) => {
      this.data_Answer = res.data;
    })
  }

  chonDapAn(id_dapAn: number, loai: number) { 
    document.getElementById("d"+this.id_cauHoi)?.classList.add("inActiveQ");


   
    if (loai == 1) {
      this.arr_de[this.id_cauHoi as keyof typeof this.arr_de] = {};
    }
    if (!(this.id_cauHoi in this.arr_de)) {
      this.arr_de[this.id_cauHoi as keyof typeof this.arr_de] = {};
    }

    this.arr_de[this.id_cauHoi as keyof typeof this.arr_de][id_dapAn] = true;
    
  }
  

  test(){
    if(this.arr_de[this.id_cauHoi][0]){
      document.getElementById("d"+this.id_cauHoi)?.classList.add("inActiveQ");
    }
    else{
      document.getElementById("d"+this.id_cauHoi)?.classList.remove("inActiveQ");
    }
  }
  index=1;
  maxindex=50;
  getOne(id: number,i:number) {
    this.id_cauHoi = id;
    this.CauHoiService.getOne(id).subscribe((res: any) => {        
      this.data_getone = res;
      if (!(this.id_cauHoi in this.arr_de)) {
        this.arr_de[this.id_cauHoi] = {};
        if (this.data_getone.maLoaiCauHoi == 3) { this.arr_de[this.id_cauHoi][0] = '' };
      }
    })
    this.index=i;
    console.log(this.index,this.id_cauHoi);
  }
  next(){
    this.CauHoiService.getOne(this.id_cauHoi+1).subscribe((res: any) => {        
      this.data_getone = res;
      if (!(this.id_cauHoi in this.arr_de)) {
        this.arr_de[this.id_cauHoi] = {};
        if (this.data_getone.maLoaiCauHoi == 3) { this.arr_de[this.id_cauHoi][0] = '' };
      }
    })
    this.CauHoiService.getAnswers(this.id_cauHoi+1).subscribe((res: any) => {
      this.data_Answer = res.data;
    })
    this.id_cauHoi=this.id_cauHoi+1
    this.activeIndex=this.id_cauHoi;
  }
  previous(){
    this.CauHoiService.getOne(this.id_cauHoi-1).subscribe((res: any) => {        
      this.data_getone = res;
      if (!(this.id_cauHoi in this.arr_de)) {
        this.arr_de[this.id_cauHoi] = {};
        if (this.data_getone.maLoaiCauHoi == 3) { this.arr_de[this.id_cauHoi][0] = '' };
      }
    })
    this.CauHoiService.getAnswers(this.id_cauHoi-1).subscribe((res: any) => {
      this.data_Answer = res.data;
    })
    this.id_cauHoi=this.id_cauHoi-1
    this.activeIndex=this.id_cauHoi;
  }
//  var a= this.data_getDN.maDoanhNghiep
//   ks:khaoSat={maKhaoSat: 0,maDoanhNghiep: ,ngayDanhGia:new Date,ngaySua: new Date,nguoiSua: ' ',maDotKhaoSat: 1,trangThai: 1}

  postRs() {
   
    //  console.log('KhaoSat')
    for (let key in this.arr_de) {
      for (let k in this.arr_de[key]) {
        const ctKs:any={};
       // var ctKs: {[key: number] : any};
       
      // console.log(this.arr_de[key][k]);
        if(k=='0'){
          ctKs.giaTriNhap=this.arr_de[key][k];
          ctKs.maCauHoi=key;
          ctKs.maLuaChon=null;
          ctKs.thoiGianTraLoi=new Date();
          ctKs.trangThai=1;
        }else{
          ctKs.giaTriNhap="null";
          ctKs.maCauHoi=key;
          ctKs.maLuaChon=k;
          ctKs.thoiGianTraLoi=new Date();
          ctKs.trangThai=1;
        }       
       
        //console.log('Mã câu hỏi :' + key + '- Mã đáp án : ' + (k == '0' ? this.arr_de[key][k] : k));
       // console.log("Start")
        //console.log('Mã câu hỏi :' + key + '- Mã đáp án : ' + (k == '0' ? this.arr_de[key][k] : k));
        this.ctks1.push(ctKs); 
        //console.log(this.ctks1);
      }
    }
    
    if(this.ctks1.length>=50){
      this.khaoSat={maKhaoSat: 0,maDoanhNghiep: this.data_getDN.maDoanhNghiep,ngayDanhGia:new Date,ngaySua: new Date,nguoiSua: ' ',maDotKhaoSat: this.selectedDevice,trangThai: 1}
      this.KhaoSat_DTO.KhaoSat=this.khaoSat;
      this.KhaoSat_DTO.CTKS=this.ctks1;
      this.KS_Service.Post_Ks(this.KhaoSat_DTO);
      // console.log('xong');
      this.toastr.success('Bạn đã hoàn thành bài khảo sát', 'Hoàn thành ');   
      this.route.navigate(['/']);
    }
    if(this.ctks1.length<50){  
      this.toastr.warning('Bạn phải hoàn thành phần khảo sát trước khi gửi', 'Chú ý: ');     
    }

  
  }


  
 

  returnChecked(value: boolean) {
    return value;
  }
  status: any = false;

  activateClass(){
    this.status = !this.status;    
  }

 
  activeClass(){
   if(this.arr_de[this.id_cauHoi])



    $(document).ready(function(){
      $('.question').click(function(){
        $().css('background-color', '#000');
      })
     
    });
  }

  // onSelect(traloi:HTMLButtonElement):void{
  //   this.traloi.nativeElement.childNodes.forEach((c:HTMLButtonElement)=>{
  //     if(c.classList && c.classList.contains('selected')){
  //       c.classList.remove('selected');
  //     }
  //   });
  //   traloi.classList.add('selected');
  // }




}
