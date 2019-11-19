export default function(file: any): any {
  delete file.currentUser;
  return file;
}
