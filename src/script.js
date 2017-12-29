if (!("lightdm" in window)) {
  var LightDMMock = LightDMMock || {};
  window.lightdm = new LightDMMock(autofill, timeout, autoGuest);
}
