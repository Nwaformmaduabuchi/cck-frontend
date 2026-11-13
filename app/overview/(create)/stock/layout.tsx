
import React, { ReactNode } from "react";

const layout = ({children}:{children:ReactNode}) => {
  return <div>
    <section>
        {children}
    </section>
  </div>;
};

export default layout;
