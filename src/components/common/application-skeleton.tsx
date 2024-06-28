"use client"
import React from "react";
import { Skeleton } from "@nextui-org/react";
import styled from "styled-components";

export default function ApplicationSkeleton() {
    return (
        <Container>
            <Wrap>
                <Skeleton style={{ height: "100%" }} className="w-full rounded-lg" />
            </Wrap>
            <Wrap>
                <Skeleton style={{ height: "100%" }} className="w-full rounded-lg" />
            </Wrap>
            <Wrap>
                <Skeleton style={{ height: "100%" }} className="w-full rounded-lg" />
            </Wrap>
            <Wrap>
                <Skeleton style={{ height: "100%" }} className="w-full rounded-lg" />
            </Wrap>
           
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
`;
