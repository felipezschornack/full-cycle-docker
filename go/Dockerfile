FROM golang:latest AS BUILDER

WORKDIR /usr/src/go
COPY main.go .
RUN go build main.go


FROM scratch
WORKDIR /usr/src/go
COPY --from=BUILDER /usr/src/go .

ENTRYPOINT [ "/usr/src/go/main" ]