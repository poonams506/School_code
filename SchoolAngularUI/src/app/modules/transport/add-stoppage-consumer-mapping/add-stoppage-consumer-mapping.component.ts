import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeItem, TreeviewConfig, TreeviewItem } from '@zerot13/ngx-treeview';
import { ConsumerTransportMappingDto, ConsumerTransportMappingUpsertDto, IStoppageConsumerTreeviewRequestDto, StoppageConsumerTreeviewRequestDto, StoppageDto, TransportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { ISelectListItem } from 'src/app/shared/ISelectListItem';
import { DateRangeValidator } from 'src/app/utils/date-range.validator';

@Component({
  selector: 'app-stoppage-consumer',
  templateUrl: './add-stoppage-consumer-mapping.component.html',
  styleUrls: ['./add-stoppage-consumer-mapping.component.scss']
})
export class AddStoppageConsumerMappingComponent {
  stoppageId: number;
  stoppageDetail: StoppageDto;
  academicYearId: number;
  submitted: boolean = false;
  modelRef: any;
  transportConsumers: TreeviewItem[] = [];
  isFeeApplicableToStaff = false;
  consumerMappingForm: FormGroup;
  consumerSearchMappingForm: FormGroup;
  roleDropdownData: ISelectListItem[];
  errors: string[] = [];
  consumerId: number;
  roleId: number;
  constructor(private formBuilder: FormBuilder,
    private transportService: TransportServiceProxy,
    private userService: UserService) {
    this.consumerMappingForm = this.formBuilder.group({
      consumers: this.formBuilder.array([])
    });
    this.consumerSearchMappingForm = this.formBuilder.group({
      currentRoleId: [5]
    });
    this.roleDropdownData = [
      { id: 3, value: 'Teacher' },
      { id: 2, value: 'Admin' },
      { id: 4, value: 'Clerk' },
      { id: 6, value: 'Cab Driver' },
      { id: 5, value: 'Student' }
    ];

  }


  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    hasCheckBoxes: true,
    maxHeight: 400,
  });

  existingConsumer: ConsumerTransportMappingDto[] = [];

  onSelectionChanged(values: number[]) {
    this.existingConsumer = [];
    const currentExistingConsumer = this.consumerMappingForm.get('consumers')?.getRawValue() as ConsumerTransportMappingDto[];


    values.forEach(selectedId => {

      var localExistingConsumer = currentExistingConsumer.filter(y => y.consumerId == selectedId);
      if (localExistingConsumer.length > 0) {
        this.existingConsumer.push(localExistingConsumer[0]);
      }
      else {
        const newConsumer = new ConsumerTransportMappingDto();
        newConsumer.transportConsumerStoppageMappingId = 0;
        newConsumer.consumerId = selectedId;
        newConsumer.userName = this.getCurrentConsumerNameFromSelected(selectedId);
        newConsumer.academicYearId = this.academicYearId;
        newConsumer.stoppageId = this.stoppageId;
        newConsumer.roleId = parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value);
        newConsumer.pickDropId = 1;
        if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) == 5){
          newConsumer.pickDropPrice = this.stoppageDetail.pickPrice;
        }
        else if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) != 5 && this.isFeeApplicableToStaff == true){
          newConsumer.pickDropPrice = this.stoppageDetail.pickPrice;
        }
        else if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) != 5 && this.isFeeApplicableToStaff != true){
          newConsumer.pickDropPrice = 0;
        }
        this.existingConsumer.push(newConsumer);
      }




    });



    this.patchConsumerFormArrayValues(this.existingConsumer);
  }

  getCurrentConsumerNameFromSelected(selectedId: number) {
    let currentUserDetail: TreeviewItem[] = [];
    if (parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) == 5) {
      currentUserDetail = this.transportConsumers
        .flatMap(x => x.children)
        .flatMap(x => x.children)
        .filter(x => x.value == selectedId);
    }
    else {
      currentUserDetail = this.transportConsumers
        .flatMap(x => x.children)
        .filter(x => x.value == selectedId);

    }
    return currentUserDetail[0].text;
  }


  onFilterChange(value: string): void {
    console.log('filter:', value);
  }


  ngOnInit(): void {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getTransportConsumer(this.stoppageId, 5);
    });

    this.consumerSearchMappingForm.get('currentRoleId')?.valueChanges.subscribe(currentValue => {
      this.getTransportConsumer(this.stoppageId, parseInt(currentValue));
    });
  }


  getTransportConsumer(stoppageId: number, roleId: number) {
    this.transportConsumers = [];
    var requestDto = { academicYearId: this.academicYearId, roleId, stoppageId } as IStoppageConsumerTreeviewRequestDto;
    this.transportService.getTransportConsumerTreeViewItem(new StoppageConsumerTreeviewRequestDto(requestDto)).subscribe(result => {
      var treeViewItem = result.lstConsumerTreeviewItem as TreeItem[];
      this.isFeeApplicableToStaff = result.lstConsumerTreeviewItem[0].isFeeApplicableToStaff;
      treeViewItem.forEach(treeView => {
        this.transportConsumers.push(new TreeviewItem(treeView, false))
      });

      this.transportConsumers[0].collapsed=false;
      if(roleId==5){
        this.transportConsumers[0].children[0].collapsed=false;
      }
    });
  }

  get f() { return this.consumerMappingForm.controls; }


  overlapTransportConsumerError: ConsumerTransportMappingDto[] = [];

  saveStoppageConsumerMapping() {
    this.overlapTransportConsumerError = [];
    this.submitted = true;

    // stop here if form is invalid
    if (this.consumerMappingForm.invalid) {
      return;
    }

    const consumerList = this.consumerMappingForm.getRawValue() as ConsumerTransportMappingUpsertDto;

    if (consumerList.consumers.length == 0) {
      this.errors.push('Please select atleast one or more consumer.');
      return;
    }
    this.transportService.saveTransportConsumerList(consumerList).subscribe(result => {
      if (!result.isSuccess) {
        this.overlapTransportConsumerError = result.lstOverlapPeriod;
      }
      else {
        this.modelRef.close(true);
      }

    });

  }
  close() {
    this.modelRef.close(false);
  }

  patchConsumerFormArrayValues(values: ConsumerTransportMappingDto[]) {

    // Clear the existing controls in the FormArray
    while (this.consumerMappingsArray.length !== 0) {
      this.consumerMappingsArray.removeAt(0);
    }

    // Iterate through the values and add them to the FormArray
    values.forEach((value) => {
      let amount = 0;
      if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) == 5){
        amount = value.pickDropPrice;
      }
      else if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) != 5 && this.isFeeApplicableToStaff == true){
        amount = value.pickDropPrice;
      }
      else if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) != 5 && this.isFeeApplicableToStaff != true){
        amount = 0;
      }
      const itemFormGroup = this.formBuilder.group({
        transportConsumerStoppageMappingId: [value.transportConsumerStoppageMappingId],
        consumerId: [value.consumerId],
        academicYearId: [value.academicYearId],
        roleId: [value.roleId],
        userName: [{ value: value.userName, disabled: true }],
        stoppageId: [value.stoppageId],
        ngbFromDate: [value.ngbFromDate, Validators.required],
        ngbToDate: [value.ngbToDate, [Validators.required]],
        pickDropId: [value.pickDropId, [Validators.required]],
        pickDropPrice: [amount, [Validators.required]],
        fromDate: [value.fromDate],
        toDate: [value.toDate],

      }, { validator: this.DateRangeValidation('ngbFromDate', 'ngbToDate') });

      itemFormGroup.get('pickDropId')?.valueChanges.subscribe((pickDropId: any) => {
        debugger;
        if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) == 5){
          if (parseInt(pickDropId) == 1) {
            itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.pickPrice);
          } else if (parseInt(pickDropId) == 2) {
            itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.dropPrice);
          } else if (parseInt(pickDropId) == 3) {
            itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.pickAndDropPrice);
          }
        }
        else if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) != 5 && this.isFeeApplicableToStaff == true){
          if (parseInt(pickDropId) == 1) {
            itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.pickPrice);
          } else if (parseInt(pickDropId) == 2) {
            itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.dropPrice);
          } else if (parseInt(pickDropId) == 3) {
            itemFormGroup.get('pickDropPrice')?.setValue(this.stoppageDetail.pickAndDropPrice);
          }
        }
        else if(parseInt(this.consumerSearchMappingForm.get('currentRoleId')?.value) != 5 && this.isFeeApplicableToStaff != true){
          if (parseInt(pickDropId) == 1) {
            itemFormGroup.get('pickDropPrice')?.setValue(0);
          } else if (parseInt(pickDropId) == 2) {
            itemFormGroup.get('pickDropPrice')?.setValue(0);
          } else if (parseInt(pickDropId) == 3) {
            itemFormGroup.get('pickDropPrice')?.setValue(0);
          }
        }
        


      });

      this.consumerMappingsArray.push(itemFormGroup);
    });
  }
  DateRangeValidation(fromDate: string, toDate: string) {
    return (formGroup: FormGroup) => {
      const fromDateControl = formGroup.controls[fromDate];
      const toDateControl = formGroup.controls[toDate];

      if (!fromDateControl.value || !toDateControl.value) {
        //toDateControl.setErrors(null);
      } else {
        if (new Date(fromDateControl.value.year, fromDateControl.value.month - 1, fromDateControl.value.day)
          > new Date(toDateControl.value.year, toDateControl.value.month - 1, toDateControl.value.day)) {
          toDateControl.setErrors({ dateRange: true });
        } else {
          toDateControl.setErrors(null);
        }
      }
    }
  }
  get consumerMappings() {
    let formArray = this.consumerMappingForm.get('consumers') as FormArray;
    return formArray.controls;
  }

  get consumerMappingsArray() {
    return this.consumerMappingForm.get('consumers') as FormArray;

  }

  resetSelectList(f: any, item: string) {
    if (f[item]?.getRawValue() == "null") {
      f[item]?.setValue(null);
      return;
    }
  }


  getPickDropTypeName(pickDropId: number) {
    if (pickDropId == 1) {
      return "Pickup";
    }
    else if (pickDropId == 2) {
      return "Drop";
    }
    else if (pickDropId == 3) {
      return "Pickup & Drop";
    }

    return "";
  }
}
