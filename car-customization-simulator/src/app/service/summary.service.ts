import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  public summaryValues: any;

  constructor() { }


  updateValues(
    selectedEngineName: string,
    selectedEnginePrice: number,
    selectedColorName: string,
    selectedColorPrice: number,
    selectedChosenColor: number,
    selectedWheelName: string,
    selectedWheelPrice: number,
  ): any {
    this.summaryValues = {
      engineName: selectedEngineName,
      enginePrice: selectedEnginePrice,
      colorName: selectedColorName,
      colorPrice: selectedColorPrice,
      chosenColor: selectedChosenColor,
      wheelName: selectedWheelName,
      wheelPrice: selectedWheelPrice,
    };
  }

  getValues(): any {
    return this.summaryValues;
  }

}
