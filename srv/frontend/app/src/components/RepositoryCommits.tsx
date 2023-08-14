import "../css/registration.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../services/projects.service";
import RepositoryActions from "./RepositoryActions";
import SelectBranchRow from "./SelectBranchRow";
import BreadcrumbRow from "./BreadCrumbRow";
import Sidebar from "./Sidebar";

const no_avatar = require("../css/no_avatar.png");

const RepositoryCommits = (props: any) => {
  let { project, repository } = useParams();

  const d: Array<any> = [];

  const [commits, setCommits] = useState(d);

  const [commits_dates, setCommitsDates] = useState(d);

  const [selected_branch, setSelectedBranch] = useState("master");

  console.log("useParams=", project);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "try getting repo commits from path=./ and branch=",
      selected_branch
    );

    ProjectService.getRepositoryCommits(
      project!,
      repository!,
      selected_branch,
      "./"
    )
    .then((data) => {
      console.log(data);

      let sdata = String(data);

      if (sdata) {
        sdata = sdata.replace("},]", "}]");

        console.log(sdata);

        var items = JSON.parse(sdata) as any[];

        setCommits(items);

        var uniqueItems = [
          ...new Set(
            items.map((e) => new Date(e.committed).toLocaleDateString())
          ),
        ];

        setCommitsDates(uniqueItems);

        console.log(commits_dates);
      }
    });
  }, [selected_branch]);

  const onActionCloneHandler = (e: any, action: string) => {
    const url = `/${project}/${repository}/${action}`;

    navigate(url);

    console.log(action, " clicked");
  };
  const OnBranchChange = (e: any) => {
    console.log("select branch=", e.target.value);

    setSelectedBranch(e.target.value);
  };

  return (
    <>
      <Sidebar
        settings="true"
        repository={{ name: repository, project: project }}
      />
      <div className="card card-container container-inner">
        <BreadcrumbRow
          project={project}
          repository={repository}
        ></BreadcrumbRow>
        <div className="repository-container">
          <div className="container">
            <div className="branch-row">
              <SelectBranchRow
                OnBranchChange={OnBranchChange}
                SelectedBranch="master"
              ></SelectBranchRow>
            </div>

            {commits_dates.map((d, i) => (
              <div key={i}>
                <div className="commit-date-header">
                  <span>{d}</span>,&nbsp;
                  <span>
                    {`${
                      commits.filter(
                        (e, i) =>
                          new Date(e.committed).toLocaleDateString() === d
                      ).length
                    } ${
                      commits.filter(
                        (e, i) =>
                          new Date(e.committed).toLocaleDateString() === d
                      ).length === 1
                        ? "commit"
                        : "commits"
                    }`}
                  </span>
                </div>
                {commits
                  .filter(
                    (e, i) => new Date(e.committed).toLocaleDateString() === d
                  )
                  .map((f, j) => (
                    <div className="commit-row2" key={j}>
                      <div className="avatar-cell d-none d-sm-block">
                        <a href="/AAKostitsyn">
                          <img
                            alt="AAKostitsyn's avatar"
                            src={no_avatar}
                            className="avatar s40 d-none d-sm-inline-block"
                            title="AAKostitsyn"
                          />
                        </a>
                      </div>

                      <div className="comment-cell">
                        <div className="commit-row-comment-value">
                          {f["comment"]}
                        </div>
                        <div className="commit-row-author-value">
                          <span className="author">{`${f.author}`}</span>{" "}
                          authored{" "}
                          <time
                            title=""
                            data-toggle="tooltip"
                            data-placement="bottom"
                            data-container="body"
                            data-original-title={f.committed}
                            aria-describedby="gl-tooltip19"
                          >
                            {f.age}
                          </time>
                        </div>
                      </div>
                      <div className="commit-cell">
                        <div className="commit-row-hash-value">{f.hash}</div>
                      </div>

                      {/* <div className='commit-row-age-value'>{f["age"]}</div>
                                            <div className='commit-row-committed-value'>{f["committed"]}</div> */}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepositoryCommits;
