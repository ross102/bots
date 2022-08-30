import { signOut } from "next-auth/react";

// gets a prop from getServerSideProps
function Completed() {
  return (
    <div style={{ paddingLeft: "20px" }}>
      <h4>Thank you. Your humanity check is completed.</h4>
      <button onClick={() => signOut()}>Sign out </button>
    </div>
  );
}

export default Completed;
