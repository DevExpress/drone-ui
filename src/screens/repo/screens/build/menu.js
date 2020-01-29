import React, { Component } from "react";
import RepoMenu from "../builds/menu";
import { RefreshIcon, CloseIcon } from "shared/components/icons";

import { cancelBuild, restartBuild } from "shared/utils/build";
import { repositorySlug } from "shared/utils/repository";

import { branch } from "baobab-react/higher-order";
import { inject } from "config/client/inject";

const binding = (props, context) => {
	const { owner, repo, build } = props.match.params;
	const slug = repositorySlug(owner, repo);
	const number = parseInt(build);
	return {
		repo: ["repos", "data", slug],
		build: ["builds", "data", slug, number],
	};
};

@inject
@branch(binding)
export default class BuildMenu extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleCancel = this.handleCancel.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}

	handleRestart() {
		const { dispatch, drone, repo, build } = this.props;
		dispatch(restartBuild, drone, repo.owner, repo.name, build.number);
	}

	handleCancel() {
		if (!confirm("Sure?")) return;

		const { dispatch, drone, repo, build, match } = this.props;

		function findProcPidToCancel() {
			const childPid = Number(match.params.proc);

			for (const proc of build.procs) {
				for (const child of proc.children) {
					if (childPid) {
						if (child.pid === childPid) {
							return proc.pid;
						}
					} else {
						if (child.state === "running" || child.state === "pending") {
							// Return pid of any active proc, Scaler will terminate others
							// https://github.com/DevExpress/devextreme-ci-aws/commit/a2a4aea136aaf912acee1984a460c79ba58709a5
							return proc.pid;
						}
					}
				}
			}

			return 0;
		}

		dispatch(
			cancelBuild,
			drone,
			repo.owner,
			repo.name,
			build.number,
			findProcPidToCancel(),
		);
	}

	render() {
		const { build } = this.props;
		const hideCancel = false;

		return (
			<div>
				{!build ? (
					undefined
				) : (
					<section>
						<ul>
							<li>
								{build.status === "pending" ||
								build.status === "running" ? !hideCancel ? (
									<button onClick={this.handleCancel} style="color: #fc4758">
										<span>🚫 Cancel Build</span>
									</button>
								) : null : (
									<button onClick={this.handleRestart}>
										<RefreshIcon />
										<span>Restart Build</span>
									</button>
								)}
							</li>
						</ul>
					</section>
				)}
				<RepoMenu {...this.props} />
			</div>
		);
	}
}
