export default class Alert {
  constructor(alertId) {
    this.alert = document.getElementById(alertId);
  }

  show(message) {
    if (this.alert) {
      this.alert.innerText = message;
      this.alert.classList.remove('d-none');
      this.alert.classList.add('alert-danger');
      
      setTimeout(() => {
        this.hide();
      }, 2500);
    }
  }

  hide() {
    if (this.alert) {
      this.alert.classList.add('d-none');
      this.alert.classList.remove('alert-danger', 'alert-success');
    }
  }

  showSuccess(message) {
    if (this.alert) {
      this.alert.innerText = message;
      this.alert.classList.remove('d-none');
      this.alert.classList.add('alert-success');
      this.alert.classList.remove('alert-danger');
      
      setTimeout(() => {
        this.hide();
      }, 2000);
    }
  }
}