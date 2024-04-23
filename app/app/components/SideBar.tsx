import React from 'react';

const SideBar: React.FC = () => {
    return (
        <div className="flex flex-col px-7 py-12 text-base text-center text-white rounded-3xl max-w-[233px]">
          {/* <img
            loading="lazy"
            srcSet="..."
            className="self-center w-32 max-w-full aspect-square rounded-[32px]"
          /> */}
          <div className="flex gap-3 mt-12 font-semibold whitespace-nowrap text-white text-opacity-50">
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e599ece538774382e278479603f4cbf938cd5c3fcf7bd81bccfcbf8dd2f22019?"
              className="shrink-0 w-6 aspect-square"
            /> */}
            <div><h1>dashboard</h1></div>
          </div>
          <div className="flex gap-3 mt-12">
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1215059fb91b71d7e5449bc535c221548ba3dd6f59f19a321bd156f680404d70?"
              className="shrink-0 w-6 aspect-square"
            /> */}
            <div>Face Recognition</div>
          </div>
          <div className="flex gap-3 mt-12 whitespace-nowrap">
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/821a09da37fe86ad51e3e1f04b49a5b825d50dbfd65085778e8476560dcf9542?"
              className="shrink-0 w-6 aspect-square"
            /> */}
            <div>Attendance</div>
          </div>
          <div className="flex gap-3 mt-12">
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5adbd63fd5dd25c3c7b6d4048d191488e3876a714f878276c6240395d6aa5cb8?"
              className="shrink-0 w-6 aspect-square"
            /> */}
            <div>Manage Students</div>
          </div>
          <div className="flex gap-3 self-start mt-96 ml-3 whitespace-nowrap text-white text-opacity-80">
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e2b6358546c8cf6c5c6b9c36c05b7af13f7ca09dd8a4f701639dc8cd46c2269?"
              className="shrink-0 w-6 aspect-square"
            />
            <div>Logout</div> */}
          </div>
        </div>
      );
};

export default SideBar;