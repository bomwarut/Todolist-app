import Swal from "sweetalert2";

export function alertsweet(title: string) {
  Swal.fire({
    icon: "error",
    title: title,
  });
}

export function confirmdelete(title: string, deeltefunc: () => void) {
  Swal.fire({
    title: "Confirm delete" + title,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deeltefunc();
    }
  });
}
