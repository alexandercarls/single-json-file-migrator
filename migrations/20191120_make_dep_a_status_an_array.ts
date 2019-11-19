export default function(file: any): any {
  const depAStatus = file.departmentA.status;
  file.departmentA.status = [depAStatus];

  return file;
}
