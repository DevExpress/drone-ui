import React from "react";

import Status from "shared/components/status";
import StatusNumber from "shared/components/status_number";
import BuildTime from "shared/components/build_time";
import EnvironLines from "./environ_lines";

import styles from "./matrix.less";

export const MatrixList = ({ children }) => (
	<div className={styles.list}>{children}</div>
);

export const MatrixItem = ({ environ, start, finish, status, number }) => (
	<div className={styles.item}>
		<div className={styles.header}>
			<EnvironLines environ={environ} />
		</div>
		<div className={styles.body}>
			<BuildTime start={start} finish={finish} />
		</div>
		<div className={styles.status}>
			<StatusNumber status={status} number={number} />
			<Status status={status} />
		</div>
	</div>
);
