const styles = theme => ({
  avatar: {
    'margin-right': '15px'
  },
  cellButton: {
    textTransform: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.8125rem',
    fontWeight: 400
  },
  paper: {
    padding: 50
  },
  heading: {
    marginBottom: 20,
    fontWeight: 200
  },
  addCircle: {
    margin: 10
  },
  tableDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

export default styles;