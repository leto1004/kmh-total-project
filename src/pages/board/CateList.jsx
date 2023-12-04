import styled from "styled-components";
import CateListItem from "./CateListItem";

const CateListItemContainer = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`

const CateList = ({cates, onRemove }) => {
  return(
    <CateListItemContainer>
      {cates.map(cate=>(
        <CateListItem cate={cate} key={cate.id} onRemove={onRemove}></CateListItem>
      ))}
    </CateListItemContainer>
  );
}

export default CateList;