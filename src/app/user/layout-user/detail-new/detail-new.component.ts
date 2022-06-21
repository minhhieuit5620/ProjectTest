import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TinTucService } from 'src/app/Sevices/TinTuc/tin-tuc.service';
import { Location } from '@angular/common';
import { TinTuc_Data } from 'src/app/model/TinTuc/tin-tuc-data.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.css']
})
export class DetailNewComponent implements OnInit {
  // pdfSource =  "../../../../assets/User/image/{{tintuc.mota}}";
  link=environment.apiUrl;
  @Input() tintuc: TinTuc_Data;
  datas:TinTuc_Data[]=[];
  constructor(
    private route: ActivatedRoute,
    private TinTucService: TinTucService,
   // private cartService:CartService,
    private location: Location
    
  ) { }

  ngOnInit(): void {
    this.getIdPro();
  }
  getIdPro():void{
    const id=(+this.route.snapshot.params["id"]);
    //const cate=(+this.route.snapshot.params["cateId"]);
    // console.log(`this.route.snapshot.paramMapId = ${JSON.stringify(this.route.snapshot.params)}`);
    this.TinTucService.getOne_(id).subscribe(tintuc => this.tintuc = tintuc);  
    //console.log(cate);
    //window.location.reload();
    
    }

}
