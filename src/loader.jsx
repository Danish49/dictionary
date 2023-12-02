import { tailChase } from "ldrs";
tailChase.register();
export default function Loader() {
  return (
    <div className="loader">
      <l-tail-chase size="100" speed="1.75" color="purple"></l-tail-chase>
    </div>
  );
}
