export default function(file) {
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
