import { Component, OnInit } from '@angular/core';
import { TinTuc_Data } from 'src/app/model/TinTuc/tin-tuc-data.model';
import { TinTucService } from 'src/app/Sevices/TinTuc/tin-tuc.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
  
  data_Intro: TinTuc_Data[];
  constructor(
    private TinTucService:TinTucService
  ) { }

  ngOnInit(): void {
    this.getTin_KHCN();
  }
  getTin_KHCN(){
    this.TinTucService.getIntro().subscribe((res:any)=>{
      this.data_Intro=res.data;
      console.log('KHCN',this.data_Intro);
    })
  }
}
