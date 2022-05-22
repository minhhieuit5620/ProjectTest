import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { CauHoi_LuaChon_DTO } from 'src/app/model/CauHoi/CauHoi_LuaChon_DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { CauHoi_DTOService } from 'src/app/Sevices/CauHoi/cau-hoi-DTO.service';
import { CauHoiService } from 'src/app/Sevices/CauHoi/cau-hoi.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  
  @Input() data_getone: CauHoi_Data;
  data: CauHoi_Data[];
  data_50: CauHoi_Data[];
  data_51:CauHoi_Data[];
  data_52:CauHoi_Data[];
  data_53:CauHoi_Data[];
  id_cauHoi:number;
  arr_de:{
 [key:number]
 : any
  };

  data_Answer:LuaChon_Data[];
  
  arr:LuaChon_Data[];
 // data_getone: CauHoi_Data;
  DL_CH: CauHoi_DTO = {
    Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 60, pageIndex: 1 }
  };


  data_CH_LC_DTO:CauHoi_LuaChon_DTO[];
 // @Input()
  data_CH_LC_DTO_getone: CauHoi_LuaChon_DTO[];
  DL_CH_LC_DTO:CauHoi_LuaChon_DTO={
    maCauHoi: 0,
    noiDung: ' ',
    goiYcauHoi: ' ',
    maLoaiCauHoi: 0,
    maNhomCauHoi: 0,
    nguoiThem: ' ',
    ngayThem: new Date,
    ngaySua: new Date,
    nguoiSua: ' ',
    trangThai:0,
    maLuaChon: 0,
    maCauHoi_LC: 0,
    noiDung_LC: ' ',
    trangThai_LC: 0
  };

  form:FormGroup;
  // form = new FormGroup({
  //   answer: new FormControl(null),
  //   // gioiTinh: new FormControl(true, [Validators.required]),
  //   // namSinh: new FormControl(null, [Validators.required]),
  //   // diaChi: new FormControl(null, [Validators.required]),
  //   // soDt: new FormControl(null, [Validators.required]),
  //   // ngheNghiep: new FormControl(null, [Validators.required]),
  //   // ngayTao: new FormControl(this.ngayTao, [Validators.required]),
  // });


  constructor(
    private CauHoiService: CauHoiService ,
    private CauHoi_DTO_Service:CauHoi_DTOService
   ) {
      // this.form = FB.group({
      //   selectedAnswers:  new FormArray([])
      //   //selectedCountries:  new FormArray([])
      //  });
    }
    // onCheckboxChange(event: any) {
    //   const selectedAnswers = (this.form.controls.selectedAnswers as FormArray);
    //   if (event.target.checked) {
    //     selectedAnswers.push(new FormControl(event.target.noiDung));
    //   } else {
    //     const index = selectedAnswers.controls
    //     .findIndex(x => x.value === event.target.noiDung);
    //     selectedAnswers.removeAt(index);
    //   }
    // }
    // submit(){
    //   console.log(this.form.value);
    // }

  ngOnInit(): void {
    this.arr_de = {};
    this.getAllCauHoi();

    this.getKS_50();
    this.getKS_51();
    this.getKS_52();
    this.getKS_53();
   // this.getCauHoiDTO();
   // localStorage.setItem('hieu','hieu');
    
  }
  addAnswers(CauHoi:CauHoi_Data,DapAn:LuaChon_Data){
    this.CauHoiService.addAnswer(CauHoi,DapAn);
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


  getAllCauHoi() {
    this.CauHoiService.getall(this.DL_CH).subscribe((res: any) => {
      this.data = res.data
      console.log(this.data);
    })
  }


  getKS_50(){
    this.CauHoiService.getCauHoi_50().subscribe((res:any)=>{
      this.data_50=res.data;
      console.log(this.data_50);
    })
  }
  getKS_51(){
    this.CauHoiService.getCauHoi_51().subscribe((res:any)=>{
      this.data_51=res.data;
      console.log(this.data_51);
    })
  }
  getKS_52(){
    this.CauHoiService.getCauHoi_52().subscribe((res:any)=>{
      this.data_52=res.data;
      console.log(this.data_52);
    })
  }
  getKS_53(){
    this.CauHoiService.getCauHoi_53().subscribe((res:any)=>{
      this.data_53=res.data;
      console.log(this.data_53);
    })
  }


  getDapAn(id:number){

    this.CauHoiService.getAnswers(id).subscribe((res:any)=>{
      this.data_Answer=res.data;
    })
  }

  chonDapAn(id_dapAn:number,loai:number){ 
    if(loai ==1){
      this.arr_de[this.id_cauHoi as keyof typeof this.arr_de] = {};
    }
    if(!(this.id_cauHoi in this.arr_de)){
      this.arr_de[this.id_cauHoi as keyof typeof this.arr_de] = {};
    }
      
    this.arr_de[this.id_cauHoi as keyof typeof this.arr_de][id_dapAn] = true;    
  }

   getOne(id:number){
    this.id_cauHoi = id;
    this.CauHoiService.getOne(id).subscribe((res:any)=>{

    this.data_getone=res;
    if(!(this.id_cauHoi in this.arr_de)){
      this.arr_de[this.id_cauHoi] = {};
      if(this.data_getone.maLoaiCauHoi == 3) {this.arr_de[this.id_cauHoi][0] = ''};
    }
    console.log(this.arr_de[this.id_cauHoi]);
    })

  }
  postRs(){
    console.log(this.arr_de);
    for(let key in this.arr_de){
      for(let k in this.arr_de[key]){
        console.log('Mã câu hỏi :'+ key + '- Mã đáp án : '+(k=='0'?this.arr_de[key][k]:k));
      }
    }
  }
  returnChecked(value:boolean){return value;
  }


  

}
