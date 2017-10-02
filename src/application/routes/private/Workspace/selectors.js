import {createSelector} from 'reselect';
import {onlineSelector} from "../Chat/selectors";
import head from 'lodash/head';



// map to workspace creator from [users]
// map to workspace participants from [users]

// count each workspace arguments
// count each workspace arguments likes



export const workspacesSelector = createSelector(
	state => state.user,
	state => state.workspaces,
	onlineSelector,
	(self, workspaces, users) => {
		return workspaces.map(workspace => ({
			...workspace,
			creator: head(users.filter(user => user.id === workspace.creator)),
			participants: users.filter(user => workspace.participants.indexOf(user.id) !== -1),
		}));
	}
);

export const workspaceSelector = createSelector(
	workspacesSelector,
	(state, props) => props.match.params.workspace,
	(workspaces, id) => {
		return head(workspaces.filter(workspace => workspace.id === id));
	}
);

// export const mapUserToArgument = createSelector(
// 	workspaceSelector,
// 	onlineSelector,
// 	(workspace, users) => {
// 		return workspace.arguments.map(argue => ({
// 			...argue,
// 			issuer: head(users.filter(user => user.id === argue.issuer)),
// 			comments: argue.comments.map(comment => ({
// 				...comment,
// 				issuer: head(users.filter(user => user.id === comment.issuer))
// 			})),
// 		}))
// 	}
// );