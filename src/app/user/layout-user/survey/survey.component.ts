import { Component, OnInit } from '@angular/core';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { CauHoiService } from 'src/app/Sevices/CauHoi/cau-hoi.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  data: CauHoi_Data[];
  DL_CH: CauHoi_DTO = {
    Data: { maCauHoi: 0, noiDung: ' ', goiYCauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 60, pageIndex: 1 }
  };
  constructor(private CauHoiService: CauHoiService) { }

  ngOnInit(): void {
    this.getCauHoi();
  }
  getCauHoi() {
    this.CauHoiService.getall(this.DL_CH).subscribe((res: any) => {
      this.data = res.data
    })
  }
}
