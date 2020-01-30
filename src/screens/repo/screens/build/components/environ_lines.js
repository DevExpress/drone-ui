import React from "react";
import styles from "./environ_lines.less";

export default function EnvironLines({ environ }) {
	return (
		<div className={styles.root}>
			{Object.entries(environ).map(renderEnvironLine)}
		</div>
	);
}

const renderEnvironLine = line => (
	<div>
		{line[0]}={line[1]}
	</div>
);
