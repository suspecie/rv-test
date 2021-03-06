import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { ItemsColor } from '../models/items-color';
import { FooterService } from '../service/footer.service';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  public wheelsLink = '/wheels';
  public colors = [];
  public description;
  public urlCarImage: string;
  public colorName: string;
  public colorPrice: number;
  public colorImage: string;
  public defaultEnginePrice: number;
  public defaultEngineModel: string;

  constructor(
    private service: CustomizationService,
    private footerService: FooterService,
    private summaryService: SummaryService,
  ) { }

  ngOnInit() {
    this.callListColors();
  }


  public changeColor(id: number, name: string, price: number): void {
    this.urlCarImage = `../../assets/images/colors/${id}.png`;
    this.colorImage = `../../assets/images/colors/dot-${id}.png`;
    this.colorName = name;
    this.colorPrice = price;
    this.changeColorBackgroundButton(id);
    this.updateFooter();
    this.updateSummary(id);
  }

  private callListColors(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp) {
            if (resp.engine && resp.engine.items && resp.engine.items.length > 0) {
              this.defaultEnginePrice = resp.engine.items[0].price;
              this.defaultEngineModel = `${resp.engine.items[0].kwh} ${resp.engine.items[0].type}`;
            }

            if (resp.color && resp.color && resp.color.items && resp.color.items.length > 0) {
              this.colors = resp.color.items;
              this.description = resp.color.description;
              this.changeColor(resp.color.items[0].id, resp.color.items[0].label, resp.color.items[0].price);
            }

          }
        }
      );
  }

  private updateFooter(): void {
    const lastFooterValues = this.footerService.getValues();
    if (lastFooterValues) {
      this.footerService
        .updateValues(
          lastFooterValues.enginePrice,
          lastFooterValues.engineModel,
          this.colorImage,
          this.colorPrice,
          null,
          null,
        );
    }
  }

  private updateSummary(id: number): void {
    const lastSummaryValues = this.summaryService.getValues();
    if (lastSummaryValues) {
      this.summaryService
        .updateValues(
          lastSummaryValues.engineName,
          lastSummaryValues.enginePrice,
          this.colorName,
          this.colorPrice,
          id,
          null,
          null
        );
    }
  }

  private changeColorBackgroundButton(id: number): void {
    let buttonEl = document.querySelectorAll('button') as NodeListOf<HTMLElement>;
    buttonEl.forEach((item) => {
      if (item.id === `dot-${id}`) {
        const selected = document.getElementById(`dot-${id}`) as HTMLElement;
        selected.classList.add('button-selected');
        selected.classList.remove('not-button-selected');
      } else {
        const notSelected = document.getElementById(item.id) as HTMLElement;
        notSelected.classList.remove('button-selected');
        notSelected.classList.add('not-button-selected');
      }
    });
  }


}
