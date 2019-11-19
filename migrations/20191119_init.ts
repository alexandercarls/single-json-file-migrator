export default function(file: any): any {
  return {
    ...file,
    departmentA: {
      status: "okay"
    },
    departmentB: {
      status: "okay"
    },
    currentUser: null
  };
}
