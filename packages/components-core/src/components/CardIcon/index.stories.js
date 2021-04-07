import { h } from "preact";
import classNames from "classnames";

import { CardIcon } from ".";

import UdsStyles from "../../../assets/css/bootstrap-asu.min.module.css";

export default {
  title: "UDS/CardIcon",
  component: CardIcon,
};

const Template = args => (
  <div className={UdsStyles["container"]}>
    <div
      className={classNames(
        UdsStyles["row"],
        UdsStyles["row-spaced"],
        UdsStyles["pt-2"],
        UdsStyles["pb-2"]
      )}
    >
      <div
        className={classNames(
          UdsStyles["col"],
          UdsStyles["col-12"],
          UdsStyles["col-md-6"],
          UdsStyles["col-lg-4"]
        )}
      >
        <CardIcon {...args} />
      </div>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  icon: "rocket",
};
