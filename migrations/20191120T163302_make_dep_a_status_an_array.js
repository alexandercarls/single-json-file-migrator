export default function(file) {
  const depAStatus = file.departmentA.status;
  file.departmentA.status = [depAStatus];

  return file;
}
