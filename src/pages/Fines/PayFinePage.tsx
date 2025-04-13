import fineImage from "../../images/fineImage.png";

const PayFinePage = () => {
  return (
    <div className="px-8 py-2 w-full h-screen flex flex-col md:flex-row items-center justify-center gap-2">
      <div className="w-full flex items-center justify-center">
        <img
          className="w-[150px] md:w-[200px] lg:w-[300px]"
          src={fineImage}
          alt="fine_image"
        />
      </div>

      <div className="w-full">
        <form className="w-full flex flex-col gap-2">
          <div className="grid grid-cols-4  gap-2 w-full">
            <label className="col-span-1 text-sm md:text-md" htmlFor="username">
              UserName
            </label>
            <input
              className="w-full col-span-3 text-xs md:text-md p-2 border border-gray-200"
              type="text"
              placeholder="Add Username"
              required
            />
          </div>

          <div className="grid grid-cols-4  gap-2 w-full">
            <label
              className="col-span-1 text-sm md:text-md"
              htmlFor="ticket_id"
            >
              Ticket Id
            </label>
            <input
              className="w-full col-span-3 text-xs md:text-md p-2 border border-gray-200"
              type="number"
              placeholder="Add Ticket id"
              required
              min={0}
            />
          </div>

          <div className="grid grid-cols-4  gap-2 w-full">
            <label className="col-span-1 text-sm md:text-md" htmlFor="fine">
              Fine
            </label>
            <input
              className="w-full col-span-3 text-xs md:text-md p-2 border border-gray-200"
              type="number"
              placeholder="Add fine"
              required
              min={0}
            />
          </div>

          <div className="w-full bg-blue-400 p-2 text-center">
            <button type="submit" className="text-xs md:text-md text-white">
              {" "}
              Pay Fine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayFinePage;
