import React, { Component } from "react";

import BuildMeta from "shared/components/build_event";
import BuildTime from "shared/components/build_time";
import { StatusLabel } from "shared/components/status";
import { firstMessageLine } from "shared/utils/build";
import EnvironLines from "./environ_lines";

import styles from "./details.less";

export class Details extends Component {
	render() {
		const { build, environ } = this.props;

		return (
			<div className={styles.info}>
				<StatusLabel status={build.status} />

				<section className={styles.message}>{firstMessageLine(build)}</section>

				{environ && (
					<section>
						<EnvironLines environ={environ} />
					</section>
				)}

				<section>
					<BuildTime
						start={build.started_at || build.created_at}
						finish={build.finished_at}
					/>
				</section>

				<section>
					<BuildMeta
						link={build.link_url}
						event={build.event}
						commit={build.commit}
						branch={build.branch}
						target={build.deploy_to}
						refspec={build.refspec}
						refs={build.ref}
					/>
				</section>
			</div>
		);
	}
}
