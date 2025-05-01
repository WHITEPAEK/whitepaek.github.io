import React from "react";
import Container from "@/components/Container/Container";
import Giscus from "@giscus/react";

const Comments = () => {
  return (
    <Container className="mb-16">
      <Giscus
        id="comments"
        repo="WHITEPAEK/whitepaek.github.io"
        repoId="R_kgDOOiy1xw"
        category="Comments"
        categoryId="DIC_kwDOOiy1x84Cpqe5"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </Container>
  );
};

export default Comments;
