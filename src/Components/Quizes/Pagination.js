import React from 'react';
import { Pagination as SemanticPagination } from 'semantic-ui-react';

const Pagination = (props) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <SemanticPagination
                onPageChange={props.nextPage}
                boundaryRange={0}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                activePage={props.currentPage}
                siblingRange={1}
                totalPages={props.totalPages}
            />
        </div>
    );
}

export default Pagination