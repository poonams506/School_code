import { Component } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  validationErrors : string[];
  title : string;
  message : string;
  modelRef: any;

    extractName(errorMessage: string): string {
        const startIndex = errorMessage.indexOf('for ');
        if (startIndex !== -1) {
            const NameStartIndex = startIndex + 'for'.length + 9; // Adjusting for space after 'for student'
            return errorMessage.substring(NameStartIndex);
        }
        return 'Unknown'; // Default value if student name not found in error message
    }
    extractPosition(position: string): string {
      const startIndex = position.indexOf('position');
      const containPayment= position.includes('fee payment associated')
      if (startIndex !== -1) {
          const endIndex = position.indexOf(' ', startIndex + 'position'.length + 1); // Finding the index of the next space after the position
          if (endIndex !== -1) {
              return position.substring(startIndex + 'position'.length + 1, endIndex);
          } else {
              return position.substring(startIndex + 'position'.length + 1);
          }
      }
      if(containPayment)
      {
        return 'Grade , Division';
      }
      return 'Unknown'; // Default value if position not found in error message
  }
  extractErrorMessage(error: string): string {
    const containsMissingColumns = error.includes('Missing columns');
    const containsHeader = error.includes('Invalid Header');
    // If the error contains any of these words, return the original error
    if (containsMissingColumns || containsHeader) {
        return error;
    }
   
    else{
    const atIndex = error.indexOf(' at ');
    const againIndex=error.indexOf('again')
    const forIndex=error.indexOf('for')
    if (atIndex !== -1) {
        return error.substring(0, atIndex);
    }
    if(againIndex!==-1 ){
      return error.substring(0, againIndex+6);
    }
    if(forIndex!==-1 ){
      return error.substring(0, forIndex);
    }
  }
    return error;
}
  

  close() {
    this.modelRef.close(false);
  }
}
