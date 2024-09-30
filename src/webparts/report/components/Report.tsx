import * as React from 'react';
import styles from './Report.module.scss';
import { IReportProps } from './IReportProps';
import { escape } from '@microsoft/sp-lodash-subset';
import App from './App';

export default class Report extends React.Component<IReportProps, {}> {
  public render(): React.ReactElement<IReportProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context
    } = this.props;

    return (
      <App context={context}/>
    );
  }
}
