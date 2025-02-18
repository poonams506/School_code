import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay, ToastEvokeService, ToastNotificationInitializer, ToastPositionEnum } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AcademicYear, CasteWiseStudentCountResponseDto, CategoryWiseStudentCountReportDTO, CategoryWiseStudentCountReportResponseDTO, DatatableResponseModel, Division, Grade, GradeDivisionMasterDto, IRequestReportDto, MasterServiceProxy, RTEStudentCountReportDTO, RTEStudentCountReportResponseDto, ReligionWiseStudentCountReporResponsetDTO, ReligionWiseStudentCountReportDTO, RequestReportDto, SchoolGradeDivisionMatrixDto, StudentAllFeeReceiptSelectDto, StudentFeeReceiptDto, StudentGenderCountReportDto, StudentGenderCountReportResponseDto, StudentGenderListDto, StudentGenderListResponseDto, StudentNameDto, StudentNameList, StudentRTEGenderListDto, StudentRTEGenderListResponseDto, StudentReportDTO, StudentReportServiceProxy } from 'src/app/services/school-api-service';
import { UserService } from 'src/app/services/user-service';
import { SharedPermissionServiceService } from 'src/app/shared/services/shared-permission-service.service';
import { environment } from 'src/environments/environment';
import { utils, writeFile } from 'xlsx-js-style';
import { ViewHistoryComponent } from '../../fee-management/view-history/view-history.component';
import { ViewTransportHistoryComponent } from '../../transport-fee-management/view-transport-history/view-transport-history.component';
import { AdhocViewHistoryComponent } from '../../adhoc-fee-management/adhoc-view-history/adhoc-view-history.component';
import { ViewStudentKitHistoryComponent } from '../../student-kit-fee-management/view-student-kit-history/view-student-kit-history.component';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  studentReportForm: FormGroup;
  errorMessages = {
    reportType: 'Please select a report type.'
  };
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  academicYearDropdownList: AcademicYear[];
  statementSubmitted = false;
  studentDropdownList: StudentNameDto[] = [];
  submitted = false;
  feeStatements: any[];
  academicYearId: any;
  studentNames: StudentNameList;
  divisionGradeMapping: SchoolGradeDivisionMatrixDto[] = [];
  gradeDropdownList: Grade[] = [];
  divisionDropdownList: Division[] = [];
  divisionFilteredDropdownList: Division[];
  castList: any[] = [];
  classIds: number[] = [];
  divisionId: any;
  gradeId: any;
  studentId: number;
  studentDto: StudentReportDTO;
  reportTypeList: any[];
  classId: any;
  gender: string;
  fetchedInfo: StudentAllFeeReceiptSelectDto;
  isClassMultiSelectApplicable: boolean = true;
  filteredStudentGenderList: StudentGenderListDto[] = [];
  filteredRTEStudentGenderList: StudentRTEGenderListDto[] = [];
  showStudentGenderListReport = false;
  feePaymentService: any;
  studentFeeReceiptList: StudentFeeReceiptDto[];

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private masterService: MasterServiceProxy,
    private formBuilder: FormBuilder,
    private studentReportService: StudentReportServiceProxy,
    public sharedPermissionServiceService: SharedPermissionServiceService,
    private toastEvokeService: ToastEvokeService,
  ) { }

  ngOnInit(): void {
    this.studentReportForm = this.formBuilder.group({
      reportType: [null, Validators.required],
      classIds: [[], Validators.required],
      gender: ['', Validators.required],
      studentId: [null],

    });
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.getMasterDropdownData();
    });

    this.studentReportForm.get('classIds')?.valueChanges.subscribe((classId: string) => {
      if (classId) {
        const selectedClassId = this.studentReportForm.get('classIds')?.value;
        const parsedSelectedClassId = parseInt(selectedClassId);
        const selectedClassMapping = this.divisionGradeMapping.find(mapping => mapping.schoolGradeDivisionMatrixId === parsedSelectedClassId);
        if (selectedClassMapping) {
          this.gradeId = selectedClassMapping.gradeId;
          this.divisionId = selectedClassMapping.divisionId;
        }
        this.studentReportService.getStudentNames(this.academicYearId, this.gradeId, this.divisionId).subscribe((response) => {
          this.studentNames = response;
          this.studentDropdownList = this.studentNames.studentNames
        });

        this.studentReportForm.get('studentId')?.setValue(null);
        //this.studentReportForm.get('fullName')?.setValue(null);
        this.clearReportData();
      }
    });

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searchDelay: 1000,
      language: {
        searchPlaceholder: this.translate.instant('SEARCH'),
        search: '<i class="bi bi-search"></i>',
        lengthMenu: this.translate.instant('SHOW_ENTRIES') + "_MENU_",
      },
      ajax: (requestListModel: any, callback: any) => {
        that.http
          .post<DatatableResponseModel>(
            environment.API_BASE_URL + "/api/FeePayment/GetFeePaymentHistoryGridList",
            {
              getListModel: requestListModel, academicYearId: this.academicYearId, gradeId: this.gradeId,
              divisionId: this.divisionId, studentId: this.studentId
            }, {}
          ).subscribe(resp => {
            that.feeStatements = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          },
            error => {

            });
      }, order: [[0, "asc"]],
      columns: [{ data: 'installmentNumber', searchable: true, orderable: true },
      { data: 'invoiceNumber', searchable: true, orderable: true },
      { data: 'onlineTransactionDateTime', searchable: true, orderable: true },
      { data: 'paidAmount', searchable: true, orderable: true },
      { data: 'paymentTypeName', searchable: true, orderable: true },
      { data: 'chequeDate', searchable: true, orderable: true },
      { data: 'isChequeOrDDClear', searchable: true, orderable: true },
      { data: 'onlineTransactionId', searchable: true, orderable: true },
      { data: null, searchable: false, orderable: false }]
    };

    this.reportTypeList = [
      { id: '1', value: 'Student Caste Report' },
      { id: '2', value: 'Student Category Report' },
      { id: '3', value: 'Student Religion Report' },
      { id: '4', value: 'Student RTE Count Report' },
      { id: '5', value: 'Student Gender Count Report' },
      { id: '6', value: 'Student Gender List Report' },
      { id: '7', value: 'Student RTE List Report' },
      { id: '8', value: 'Student Fee Statement' }
    ];
    this.studentReportForm.get('reportType')?.valueChanges.subscribe(() => {
      this.studentReportForm.get('classIds')?.setValue([]);
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
  back() {
    this.router.navigate(['students/student-report']);
  }

  viewStatement(item: StudentFeeReceiptDto) {
    switch (item.receiptType) {
      case 'Academic Fee':
        this.viewFeePaymentHistory(item);
        break;
      case 'Transport Fee':
        this.viewTransportPaymentHistory(item);
        break;
      case 'Additional Fee':
        this.viewAdhocFeeHistory(item);
        break;
      case 'Student Kit Fee':
        this.viewStudentKitHistory(item);
        break;
    }
  }

  deleteFeeStatement(item: any) {
    const newConfirmBox = new ConfirmBoxInitializer();
    newConfirmBox.setTitle(this.translate.instant('CONFIRM'));
    newConfirmBox.setMessage(
      this.translate.instant("DO_YOU_WANT_TO_DELETE_INVOICE_NUMBER") + ' ' + item.invoiceNumber + '?'
    );
    newConfirmBox.setConfig({
      confirmLabel: this.translate.instant('YES'), // default confirmation button label
      declineLabel: this.translate.instant('NO'),

    });
    newConfirmBox.openConfirmBox$().subscribe((resp: any) => {
      if (resp?.success) {
        //delect api pending
        this.feePaymentService.feePaymentDelete(item.feePaymentId).
          subscribe((result: number) => {
            if (result > 0) {
              const newToastNotification = new ToastNotificationInitializer();
              newToastNotification.setTitle(this.translate.instant('SUCCESS'));
              newToastNotification.setConfig({
                toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
                layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER |
              });
              newToastNotification.setMessage(this.translate.instant('INVOICE_DELETED_SUCCESSFULLY'));
              newToastNotification.openToastNotification$();
              this.rerender();
            }
            else {
              const newToastNotification = new ToastNotificationInitializer();
              newToastNotification.setTitle(this.translate.instant('WARNING'));
              newToastNotification.setConfig({
                toastPosition: ToastPositionEnum.TOP_RIGHT, // SUCCESS | INFO | NONE | DANGER | WARNING
                layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER |
              });
              newToastNotification.setMessage(this.translate.instant('YOU_CAN_NOT_DELETE_INVOICES_BECAUSE_DISCOUNT_HAS_BEEN_APPLIED_IF_STILL_YOU_WANT_TO_DELETE_THIS_INVOICE_THEN_PLEASE_DELETE_ALL_CORRESPONDING_INVOICE_FOR_APPLIED_DISCOUNT', item.invoiceNumber));
              newToastNotification.openToastNotification$();
            }
          });
      }
    });
  }

  get f() { return this.studentReportForm.controls; }

  onReportTypeChange(event: Event) {
    const selectedReportType = (event.target as HTMLSelectElement).value;
    const genderControl = this.studentReportForm.get('gender');
    const classIdsControl = this.studentReportForm.get('classIds');

    if (selectedReportType == '8') {
      this.isClassMultiSelectApplicable = false;
    }
    else {
      this.isClassMultiSelectApplicable = true;
    }
    genderControl?.setValue('');

    this.clearReportData();

    if (selectedReportType !== '6' && selectedReportType !== '7') {
      genderControl?.clearValidators();
    } else {
      genderControl?.setValidators([Validators.required]);
    }
    genderControl?.updateValueAndValidity();
  if (classIdsControl) {
    classIdsControl.setValue([]);
    this.selectAllClass = false; 
    this.checkSelectAllClass(); 
  }
  }

  clearReportData() {
    this.castList = [];
    this.categoryList = [];
    this.religionList = [];
    this.rteListCount = [];
    this.genderList = [];
    this.filteredStudentGenderList = [];
    this.filteredRTEStudentGenderList = [];
    this.studentGenderList = [];
    this.studentDto = new StudentReportDTO();
    this.categoryDto = new CategoryWiseStudentCountReportDTO();
    this.religionDto = new ReligionWiseStudentCountReportDTO();
    this.rteCountDto = new RTEStudentCountReportDTO();
    this.rteFilteredDto = new StudentRTEGenderListDto();
    this.genderDto = new StudentGenderCountReportDto();
    this.studentGenderDto = new StudentGenderListDto();
  }

  selectAllClass: boolean = false;
  selectAllOptionClass() {
    if (this.selectAllClass) {
      const selected = this.divisionGradeMapping.map(item => item.schoolGradeDivisionMatrixId);
      this.studentReportForm.get('classIds')?.patchValue(selected);
    } else {
      this.studentReportForm.get('classIds')?.patchValue([]);
    }
    this.clearReportData(); // Clear data when selecting all options
  }
  getMasterDropdownData() {
    this.userService.getAcademicYear().subscribe((academicYearId: number | undefined) => {
      this.academicYearId = academicYearId as number;
      this.masterService.getAddressMasterData().subscribe(masterData => {
        this.masterService.getGradeDivisionMasterList(this.academicYearId).subscribe((gradeMaster: GradeDivisionMasterDto) => {
          this.gradeDropdownList = gradeMaster.grades as Grade[];
          this.divisionDropdownList = gradeMaster.divisions as Division[];
          this.divisionGradeMapping = gradeMaster.schoolGradeDivisionMatrixCascadeList as SchoolGradeDivisionMatrixDto[];

        });
      });
    });
    this.masterService.getAcademicYearData().subscribe(masterData => {
      this.academicYearDropdownList = masterData.academicYears;
    });
  }
  getAcademicYearValue() {
    if (this.academicYearDropdownList.filter(x => x.academicYearId == this.academicYearId).length > 0)
      return this.academicYearDropdownList.filter(x => x.academicYearId == this.academicYearId)[0].academicYearKey;
    else
      return null;
  }

  checkSelectAllClass() {
    ;
    let selectedClassList = this.studentReportForm.get('classIds')?.getRawValue() as number[];
    this.selectAllClass = selectedClassList.length === this.divisionGradeMapping.length;
  }

  onGenerateReport() {
    this.submitted = true;
    if (!this.studentReportForm.valid) {
      return;
    }
    const reportType = this.studentReportForm.value.reportType;
    if (reportType == '8') {
      this.classId = this.studentReportForm.get('classIds')?.value;
      this.studentId = this.studentReportForm.get('studentId')?.value;
    } else {
      // Retrieve selected classIds and convert to proper format
      const selectedClassId = this.studentReportForm.get('classIds')?.value;
      this.classIds = selectedClassId.map((classId: number) => parseInt(classId.toString(), 10));
    }

    switch (reportType) {
      case '1':
        this.getCasteSelect(this.academicYearId, this.classIds);
        break;
      case '2':
        this.getCategorySelect(this.academicYearId, this.classIds);
        break;
      case '3':
        this.getReligionSelect(this.academicYearId, this.classIds);
        break;
      case '4':
        this.getRTEStudent(this.academicYearId, this.classIds);
        break;
      case '5':
        this.getGenderStudentList(this.academicYearId, this.classIds);
        break;
      case '6':
        this.getFilteredGenderList(this.academicYearId, this.classIds);
        break;
      case '7':
        this.getFilterdRTEStudentList(this.academicYearId, this.classIds);
        break;
      case '8':
        this.getStudentFeeStatementSelect(this.academicYearId, this.studentId, this.classId);
        break;
      default:
        break;
    }
  }

  getStudentFeeStatementSelect(academicYearId: number, studentId: number, classId: number) {
    if (studentId && studentId > 0 && academicYearId && academicYearId > 0) {
      this.studentReportService.getStudentAllFeeReceiptSelect(academicYearId, studentId, classId).
        subscribe((feeStatementDetail: StudentAllFeeReceiptSelectDto) => {
          this.fetchedInfo = feeStatementDetail;
        });
    }
  }
  getCasteSelect(academicYearId: number, classIds: number[]): void {
    let requestReportDto = { academicYearId: academicYearId, classIds: classIds } as IRequestReportDto as RequestReportDto;
    this.studentReportService.getCasteWiseStudentCountSelect(requestReportDto).subscribe(
      (response: CasteWiseStudentCountResponseDto) => {
        this.castList = response.castCountStudentList!;
        console.log('Cast List:', this.castList);
        if (this.castList.length > 0) {
          const firstItem = this.castList[0];
          this.studentDto = new StudentReportDTO();
          this.studentDto.academicYearId = firstItem.academicYearId;
          this.studentDto.class = firstItem.class;
          this.studentDto.formattedCasteName = firstItem.formattedCasteName;
          this.studentDto.casteCount = firstItem.casteCount;
          this.studentDto.totalCount = firstItem.totalCount;
        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  categoryList: CategoryWiseStudentCountReportDTO[] = [];
  categoryDto: CategoryWiseStudentCountReportDTO = new CategoryWiseStudentCountReportDTO();
  getCategorySelect(academicYearId: number, classIds: number[]): void {
    const requestReportDto: RequestReportDto = { academicYearId, classIds } as RequestReportDto;
    this.studentReportService.getcategoryStudentCountSelect(requestReportDto).subscribe(
      (response: CategoryWiseStudentCountReportResponseDTO) => {
        this.categoryList = response.categoryCountList!;
        console.log('Category List:', this.categoryList);
        if (this.categoryList.length > 0) {
          const firstItem = this.categoryList[0];
          this.categoryDto = new CategoryWiseStudentCountReportDTO();
          this.categoryDto.academicYearId = firstItem.academicYearId;
          this.categoryDto.class = firstItem.class;
          this.categoryDto.categoryName = firstItem.categoryName;
          this.categoryDto.categoryCount = firstItem.categoryCount;
          this.categoryDto.totalCount = firstItem.totalCount;
        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  religionList: any[] = [];
  religionDto: ReligionWiseStudentCountReportDTO = new ReligionWiseStudentCountReportDTO();
  getReligionSelect(academicYearId: number, classIds: number[]): void {
    let requestReportDto = { academicYearId: academicYearId, classIds: classIds } as RequestReportDto;
    this.studentReportService.getReligionStudentCountSelect(requestReportDto).subscribe(
      (response: ReligionWiseStudentCountReporResponsetDTO) => {
        this.religionList = response.religionCountList || [];
        console.log('Religion List:', this.religionList);
        if (this.religionList.length > 0) {
          const firstItem = this.religionList[0];
          this.religionDto = new ReligionWiseStudentCountReportDTO();
          this.religionDto.academicYearId = firstItem.academicYearId;
          this.religionDto.class = firstItem.class;
          this.religionDto.religionName = firstItem.religionName;
          this.religionDto.religionCount = firstItem.religionCount;
          this.religionDto.totalCount = firstItem.totalCount;
        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  rteListCount: any[] = [];
  rteCountDto: RTEStudentCountReportDTO = new RTEStudentCountReportDTO();
  getRTEStudent(academicYearId: number, classIds: number[]): void {
    let requestReportDto = { academicYearId: academicYearId, classIds: classIds } as RequestReportDto;
    this.studentReportService.getRTEStudentCountSelect(requestReportDto).subscribe(
      (response: RTEStudentCountReportResponseDto) => {
        this.rteListCount = response.rteCountList || [];
        console.log('RTE List:', this.rteListCount);
        if (this.rteListCount.length > 0) {
          const firstItem = this.rteListCount[0];
          this.rteCountDto = new RTEStudentCountReportDTO();
          this.rteCountDto.academicYearId = firstItem.academicYearId;
          this.rteCountDto.class = firstItem.class;
          this.rteCountDto.girlsCount = firstItem.girlsCount;
          this.rteCountDto.boysCount = firstItem.boysCount;
          this.rteCountDto.studentCount = firstItem.studentCount;
          this.rteCountDto.rteCount = firstItem.rteCount;
          this.rteCountDto.rteGirlsCount = firstItem.rteGirlsCount;
          this.rteCountDto.rteBoysCount = firstItem.rteBoysCount;
        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  rteFilteredStudentList: any[] = [];
  rteFilteredDto: StudentRTEGenderListDto = new StudentRTEGenderListDto();
  getFilterdRTEStudentList(academicYearId: number, classIds: number[]): void {
    let requestReportDto = { academicYearId: academicYearId, classIds: classIds } as RequestReportDto;
    this.studentReportService.getRTEStudentListSelect(requestReportDto).subscribe(
      (response: StudentRTEGenderListResponseDto) => {
        this.rteFilteredStudentList = response.rteStudentGenderList || [];
        this.filterGenderList(this.studentReportForm.value.gender);
        console.log('RTE Fitered Student List:', this.rteFilteredStudentList);
        if (this.rteFilteredStudentList.length > 0) {
          const firstItem = this.rteFilteredStudentList[0];
          this.rteFilteredDto = new StudentRTEGenderListDto();
          this.rteFilteredDto.class = firstItem.class;
          this.rteFilteredDto.girls = firstItem.girls;
          this.rteFilteredDto.boys = firstItem.boys;
          this.rteFilteredDto.studentName = firstItem.studentName;
        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  studenNotExistErrorNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    const title = this.translate.instant('FAILED_!');
    const message = this.translate.instant('NO_RECORD_FOUND');
    this.toastEvokeService.danger(
      title,
      message
    ).subscribe();
  }

  genderList: any[] = [];
  genderDto: StudentGenderCountReportDto = new StudentGenderCountReportDto();
  getGenderStudentList(academicYearId: number, classIds: number[]): void {
    let requestReportDto = { academicYearId: academicYearId, classIds: classIds } as RequestReportDto;
    this.studentReportService.getTotalStudentCountSelect(requestReportDto).subscribe(
      (response: StudentGenderCountReportResponseDto) => {
        this.genderList = response.studentountList || [];
        this.showStudentGenderListReport = true;
        console.log('Gender List:', this.genderList);
        if (this.genderList.length > 0) {
          const firstItem = this.genderList[0];
          this.genderDto = new StudentGenderCountReportDto();
          // this.genderDto.academicYearId = firstItem.academicYearId;
          this.genderDto.class = firstItem.class;
          this.genderDto.girlsCount = firstItem.girlsCount;
          this.genderDto.boysCount = firstItem.boysCount;
          this.genderDto.totalCount = firstItem.totalCount
        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  studentGenderList: any[] = [];
  studentGenderDto: StudentGenderListDto = new StudentGenderListDto();
  getFilteredGenderList(academicYearId: number, classIds: number[]): void {
    let requestReportDto = { academicYearId: academicYearId, classIds: classIds } as RequestReportDto;
    this.studentReportService.getStudentGenderListSelect(requestReportDto).subscribe(
      (response: StudentGenderListResponseDto) => {
        this.studentGenderList = response.studentGenderList || [];
        this.filterGenderList(this.studentReportForm.value.gender);
        console.log('Student Gender List:', this.studentGenderList);
        if (this.studentGenderList.length > 0) {
          const firstItem = this.studentGenderList[0];
          this.studentGenderDto = new StudentGenderListDto();
          this.studentGenderDto.class = firstItem.class;
          this.studentGenderDto.studentName = firstItem.studentName;
          this.studentGenderDto.gender = firstItem.gender;
          this.studentGenderDto.girls = firstItem.girls;
          this.studentGenderDto.boys = firstItem.boys;

        } else {
          this.studenNotExistErrorNotification();
        }
      },
    );
  }

  onGenderChange(event: Event) {
    this.clearReportData();
    this.selectAllClass = false;
  }

  filterGenderList(gender: string) {
    const reportType = this.studentReportForm.get('reportType')?.value;
    if (reportType === '6') {
      this.filteredStudentGenderList = this.studentGenderList.filter(student => student.gender === gender);
    } else if (reportType === '7') {
      this.filteredRTEStudentGenderList = this.rteFilteredStudentList.filter(student => student.gender === gender);
    }
  }

  onReset() {
    this.submitted = false;
    this.studentReportForm.reset();
    this.selectAllClass = false;
    this.studentReportForm.reset();
    this.castList = [];
    this.categoryList = [];
    this.religionList = [];
    this.rteListCount = [];
    this.genderList = [];
    this.filteredStudentGenderList = [];
    this.filteredRTEStudentGenderList = [];
    this.studentGenderList = [];
    this.studentGenderDto = new StudentGenderListDto();
    this.rteFilteredDto = new StudentRTEGenderListDto();
    this.genderDto = new StudentGenderCountReportDto();
    this.rteFilteredDto = new StudentRTEGenderListDto();
    this.rteCountDto = new RTEStudentCountReportDTO();
    this.religionDto = new ReligionWiseStudentCountReportDTO();
    this.categoryDto = new CategoryWiseStudentCountReportDTO();
    this.studentDto = new StudentReportDTO();
    this.rteFilteredStudentList = [];
  }

  getReportName(id: string) {
    debugger
    const reportType = this.reportTypeList.find(x => x.id == id);
    if (reportType) {
      let reportName = reportType.value;
      return reportName;
    }
  }

  viewFeePaymentHistory(item: StudentFeeReceiptDto) {
    const modalRef = this.modalService.open(ViewHistoryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.gradeId = this.gradeId;
    modalRef.componentInstance.divisionId = this.divisionId;
    modalRef.componentInstance.studentId = this.studentId;
    modalRef.componentInstance.feePaymentId = item.receiptId;
    modalRef.componentInstance.modelRef = modalRef;
  }
  viewTransportPaymentHistory(item: StudentFeeReceiptDto) {
    const modalRef = this.modalService.open(ViewTransportHistoryComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicYearId = this.academicYearId;
    modalRef.componentInstance.consumerId = this.studentId;
    modalRef.componentInstance.roleId = 5;
    modalRef.componentInstance.transportConsumerStoppageMappingId = item.transportConsumerStoppageMappingId;
    modalRef.componentInstance.transportFeePaymentId = item.receiptId;
    modalRef.componentInstance.modelRef = modalRef;
  }
  viewAdhocFeeHistory(item : StudentFeeReceiptDto){
    const modalRef = this.modalService.open(AdhocViewHistoryComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.gradeId=this.gradeId;
    modalRef.componentInstance.divisionId=this.divisionId;
    modalRef.componentInstance.studentId=this.studentId;
    modalRef.componentInstance.adhocFeePaymentId=item.receiptId;
    modalRef.componentInstance.modelRef=modalRef;
  }
  viewStudentKitHistory(item : StudentFeeReceiptDto){
    const modalRef = this.modalService.open(ViewStudentKitHistoryComponent, { size: 'lg',backdrop:'static' });
    modalRef.componentInstance.academicYearId=this.academicYearId;
    modalRef.componentInstance.gradeId=this.gradeId;
    modalRef.componentInstance.divisionId=this.divisionId;
    modalRef.componentInstance.studentId=this.studentId;
    modalRef.componentInstance.studentKitFeePaymentId=item.receiptId;
    modalRef.componentInstance.modelRef=modalRef;
  }
  exportData(): void {
    const reportType = this.studentReportForm.value.reportType;
    let exportData: any[] = [];
    let headings: string[][] = [];
    let genderLabel = '';

    switch (reportType) {
      case '1':
        exportData = this.castList.map(item => ({
          Class: item.class,
          CasteName: item.casteName,
          CasteCount: item.casteCount,
          TotalCount: item.totalCount,
        }));
        headings = [[`${this.getReportName('1')}`], [], ['Class', 'CasteName', 'Student Count by Caste', 'Number of Students']];
        break;
      case '2':
        exportData = this.categoryList.map(item => ({
          Class: item.class,
          CategoryName: item.categoryName,
          CategoryCount: item.categoryCount,
          TotalCount: item.totalCount,
        }));
        headings = [[`${this.getReportName('2')}`], [], ['Class', 'Category', 'Student Count by Category', 'Number of Students']];
        break;
      case '3':
        exportData = this.religionList.map(item => ({
          Class: item.class,
          ReligionName: item.religionName,
          ReligionCount: item.religionCount,
          TotalCount: item.totalCount,
        }));
        headings = [[`${this.getReportName('3')}`], [], ['Class', 'Religion', 'Student Count by Religion', 'Number of Students']];
        break;
      case '4':
        exportData = this.rteListCount.map(item => ({
          Class: item.class,
          GirlsCount: item.girlsCount,
          BoysCount: item.boysCount,
          // StudentCount: item.studentCount,
          RteCount: item.rteCount,
          // RteGirlsCount: item.rteGirlsCount,
          // RteBoysCount: item.rteBoysCount,
        }));
        headings = [[`${this.getReportName('4')}`], [], ['Class', '	RTE(Girls)', 'RTE(Boys)', 'Number of RTE Students']];
        break;
      case '5':
        exportData = this.genderList.map(item => ({
          Class: item.class,
          GirlsCount: item.girlsCount,
          BoysCount: item.boysCount,
          TotalCount: item.totalCount,
        }));
        headings = [[`${this.getReportName('5')}`], [], ['Class', 'Count(Girls)', 'Count(Boys)', 'Number of Students']];
        break;
      case '6':
        exportData = this.filteredStudentGenderList.map(item => ({
          Class: item.class,
          StudentName: item.studentName,
          Gender: item.gender ? this.translateGender(item.gender) : '', // Check if item.gender is defined
        }));
        headings = [[`${this.getReportName('6')}`], [], ['Class', 'StudentName', 'Gender']];
        genderLabel = this.filteredStudentGenderList.some(item => item.gender === 'M') ? 'Male' : 'Female';
        break;
      case '7':
        exportData = this.filteredRTEStudentGenderList.map(item => ({
          Class: item.class,
          StudentName: item.studentName,
          Gender: item.gender ? this.translateGender(item.gender) : '', // Check if item.gender is defined
        }));
        headings = [[`${this.getReportName('7')}`], [], ['Class', 'StudentName', 'Gender']];
        genderLabel = this.filteredRTEStudentGenderList.some(item => item.gender === 'M') ? 'Male' : 'Female';
        break;

      case '8':        
      exportData = this.fetchedInfo?.studentFeeReceiptList?.map(item => ({
        ReceiptType: item.receiptType,
        InvoiceNumber: item.invoiceNumber,
        OnlineTransactionDateTime : item.onlineTransactionDateTime.toDate(),
        PaidAmount:item.paidAmount,
        PaymentType:item.paymentType,
        ChequeDate:item.chequeDate.toDate(),
        IsChequeClear : item.isChequeClear,
        TransactionId : item.transactionId,
      })) ?? [];
      headings = [[`${this.getReportName('8')}`], [], ['ReceiptType', 'InvoiceNumber','TransactionDate','PaidAmount','PaymentType','ChequeDate','IsChequeClear','TransactionId']];
      break;
    }

    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings, { origin: 'A1' });
    utils.sheet_add_json(ws, exportData, { origin: 'A4', skipHeader: true });

    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: headings[2].length - 1 } },
    ];

    const applyStyle = (cell: any, fontSize: any, bold: any, underline: any) => {
      if (ws[cell]) {
        ws[cell].s = {
          font: { bold, underline, sz: fontSize },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }
        };
      }
    };

    applyStyle(utils.encode_cell({ r: 0, c: 0 }), 16, true, true);

    const range = utils.decode_range(ws['!ref']);
    const borderStyle = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = utils.encode_cell({ r: R, c: C });
        if (!ws[cell]) ws[cell] = { v: "" };
        if (!ws[cell].s) ws[cell].s = {};
        ws[cell].s.border = borderStyle;
      }
    }

    utils.book_append_sheet(wb, ws, 'Report');
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const secondsString = seconds < 10 ? '0' + seconds : seconds;
    const timeString = `${hours}.${minutesString}.${secondsString}${ampm}`;
    const filename = `${this.getReportName(reportType)}${'-'}${genderLabel ? genderLabel + '-' : ''}${dateString} ${timeString}.xlsx`;

    writeFile(wb, filename);
  }

  translateGender(gender: string): string {
    return gender === 'M' ? 'Male' : 'Female';
  }

  resetSelectList(f: any) {
    if (f.value == null || f.value == "null") {
      f.setValue(null!);
    }
  }
}